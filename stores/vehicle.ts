import { defineStore } from 'pinia'
import type { Vehicle, VehiclesResponse, VehicleFilters, ResponseMetadata } from '~/features/vehicle/types'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [] as Vehicle[],
    currentVehicle: null as Vehicle | null,
    metadata: null as ResponseMetadata | null,
    filters: {
      page: 1,
      resultsPerPage: 10,
      advertClassification: '',
      make: '',
      model: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: ''
    } as VehicleFilters,
    loading: true,
    initialLoadComplete: false,
    error: null as string | null,
    availableMakes: [] as string[],
    availableModels: [] as string[],
    clientFilter: '' as string, // 'offers' for client-side filtering
    lastFetchKey: '' as string // Cache key for last fetch to prevent redundant requests
  }),

  getters: {
    filteredVehicles: state => {
      if (state.clientFilter === 'offers') {
        return state.vehicles.filter(v => v.has_offer)
      }
      return state.vehicles
    },
    hasVehicles: state => state.vehicles.length > 0,
    totalPages: state => {
      // When client-side filtering for offers, don't show pagination
      if (state.clientFilter === 'offers') {
        return 0
      }
      return state.metadata?.last_page || 0
    },
    currentPage: state => state.metadata?.current_page || 1,
    totalVehicles: state => {
      if (state.clientFilter === 'offers') {
        return state.vehicles.filter(v => v.has_offer).length
      }
      return state.metadata?.total || 0
    },
    newVehiclesCount: state => state.metadata?.total_new_vehicles || 0,
    usedVehiclesCount: state => state.metadata?.total_used_vehicles || 0,
    offerVehiclesCount: state => state.metadata?.offer_vehicles || 0
  },

  actions: {
    async fetchVehicles() {
      // Start timing for minimum loading duration
      const startTime = Date.now()
      const minLoadingTime = 500 // Minimum 500ms to show skeleton

      try {
        const config = useRuntimeConfig()
        const queryParams = new URLSearchParams()

        // Map frontend camelCase keys to API snake_case parameters
        const apiKeyMap: Record<string, string> = {
          page: 'page',
          resultsPerPage: 'results_per_page',
          advertClassification: 'advert_classification',
          make: 'make',
          model: 'model',
          fuelType: 'fuel_type',
          transmission: 'transmission',
          bodyType: 'body_type',
          minPrice: 'min_price',
          maxPrice: 'max_price',
          minYear: 'min_year',
          maxYear: 'max_year'
        }

        // Build query string from filters with correct API parameter names
        Object.entries(this.filters).forEach(([key, value]) => {
          if (value !== '' && value !== undefined && value !== null) {
            const apiKey = apiKeyMap[key] || key
            queryParams.append(apiKey, String(value))
          }
        })

        const queryString = queryParams.toString()
        const fetchKey = `${config.public.apiBase}/vehicles?${queryString}`

        // Skip fetch if same as last request (prevents redundant calls)
        if (this.lastFetchKey === fetchKey && this.vehicles.length > 0) {
          return
        }

        this.loading = true
        this.error = null

        const response = await $fetch<VehiclesResponse>(fetchKey)

        this.vehicles = response.data
        this.metadata = response.meta
        this.lastFetchKey = fetchKey

        // Ensure minimum loading time to prevent flicker
        const elapsedTime = Date.now() - startTime
        if (elapsedTime < minLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime))
        }
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch vehicles'
        console.error('Error fetching vehicles:', err)
      } finally {
        this.loading = false
        this.initialLoadComplete = true
      }
    },

    async fetchVehicleById(id: number) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const response = await $fetch<Vehicle>(`${config.public.apiBase}/vehicles/${id}`)
        this.currentVehicle = response
        return response
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch vehicle'
        console.error('Error fetching vehicle:', err)
        return null
      } finally {
        this.loading = false
      }
    },

    async fetchVehicleByVRM(vrm: string) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const response = await $fetch<Vehicle>(`${config.public.apiBase}/vehicles/vrm/${vrm}`)
        this.currentVehicle = response
        return response
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch vehicle'
        console.error('Error fetching vehicle by VRM:', err)
        return null
      } finally {
        this.loading = false
      }
    },

    async fetchAvailableMakes() {
      // Extract unique makes from vehicles data
      if (this.vehicles.length > 0) {
        const makes = [...new Set(this.vehicles.map(v => v.make))].sort()
        this.availableMakes = makes
      }
    },

    async fetchAvailableModels(make?: string) {
      // Extract unique models from vehicles data, optionally filtered by make
      if (this.vehicles.length > 0) {
        let filteredVehicles = this.vehicles
        if (make) {
          filteredVehicles = this.vehicles.filter(v => v.make === make)
        }
        const models = [...new Set(filteredVehicles.map(v => v.model))].sort()
        this.availableModels = models
      }
    },

    updateFilters(newFilters: Partial<VehicleFilters>) {
      this.filters = { ...this.filters, ...newFilters }
    },

    resetFilters() {
      this.filters = {
        page: 1,
        resultsPerPage: 10,
        advertClassification: '',
        make: '',
        model: '',
        fuelType: '',
        transmission: '',
        bodyType: '',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: ''
      }
      this.clientFilter = ''
    },

    setPage(page: number) {
      this.filters.page = page
      this.fetchVehicles()
      // Prefetch next page in background
      this.prefetchNextPage()
    },

    nextPage() {
      if (this.metadata && this.filters.page! < this.metadata.last_page) {
        this.filters.page = (this.filters.page || 1) + 1
        this.fetchVehicles()
        // Prefetch next page in background
        this.prefetchNextPage()
      }
    },

    previousPage() {
      if (this.filters.page && this.filters.page > 1) {
        this.filters.page -= 1
        this.fetchVehicles()
        // Prefetch next page in background
        this.prefetchNextPage()
      }
    },

    async prefetchNextPage() {
      // Prefetch next page data in the background for faster navigation
      if (!this.metadata || this.filters.page! >= this.metadata.last_page) {
        return
      }

      const config = useRuntimeConfig()
      const queryParams = new URLSearchParams()
      const nextPage = (this.filters.page || 1) + 1

      const apiKeyMap: Record<string, string> = {
        page: 'page',
        resultsPerPage: 'results_per_page',
        advertClassification: 'advert_classification',
        make: 'make',
        model: 'model',
        fuelType: 'fuel_type',
        transmission: 'transmission',
        bodyType: 'body_type',
        minPrice: 'min_price',
        maxPrice: 'max_price',
        minYear: 'min_year',
        maxYear: 'max_year'
      }

      // Build query string with next page number
      Object.entries({ ...this.filters, page: nextPage }).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          const apiKey = apiKeyMap[key] || key
          queryParams.append(apiKey, String(value))
        }
      })

      // Prefetch without blocking (fire and forget)
      try {
        await $fetch<VehiclesResponse>(
          `${config.public.apiBase}/vehicles?${queryParams.toString()}`
        )
      } catch (err) {
        // Silently fail - prefetch is optional
        console.debug('Prefetch failed:', err)
      }
    }
  }
})
