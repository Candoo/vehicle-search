import { defineStore } from 'pinia'
import type { Vehicle, VehiclesResponse, VehicleFilters, ResponseMetadata } from '~/types/vehicle'

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
    loading: false,
    error: null as string | null,
    availableMakes: [] as string[],
    availableModels: [] as string[]
  }),

  getters: {
    hasVehicles: (state) => state.vehicles.length > 0,
    totalPages: (state) => state.metadata?.last_page || 0,
    currentPage: (state) => state.metadata?.current_page || 1,
    totalVehicles: (state) => state.metadata?.total || 0,
    newVehiclesCount: (state) => state.metadata?.total_new_vehicles || 0,
    usedVehiclesCount: (state) => state.metadata?.total_used_vehicles || 0,
    offerVehiclesCount: (state) => state.metadata?.offer_vehicles || 0
  },

  actions: {
    async fetchVehicles() {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const queryParams = new URLSearchParams()

        // Build query string from filters
        Object.entries(this.filters).forEach(([key, value]) => {
          if (value !== '' && value !== undefined && value !== null) {
            queryParams.append(key, String(value))
          }
        })

        const response = await $fetch<VehiclesResponse>(
          `${config.public.apiBase}/vehicles?${queryParams.toString()}`
        )

        this.vehicles = response.data
        this.metadata = response.meta
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch vehicles'
        console.error('Error fetching vehicles:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchVehicleById(id: number) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const response = await $fetch<{ data: Vehicle }>(
          `${config.public.apiBase}/vehicles/${id}`
        )
        this.currentVehicle = response.data
        return response.data
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch vehicle'
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
        const response = await $fetch<{ data: Vehicle }>(
          `${config.public.apiBase}/vehicles/vrm/${vrm}`
        )
        this.currentVehicle = response.data
        return response.data
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch vehicle'
        console.error('Error fetching vehicle by VRM:', err)
        return null
      } finally {
        this.loading = false
      }
    },

    async fetchAvailableMakes() {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch<{ data: string[] }>(
          `${config.public.apiBase}/makes`
        )
        this.availableMakes = response.data
      } catch (err: any) {
        console.error('Error fetching makes:', err)
      }
    },

    async fetchAvailableModels(make?: string) {
      try {
        const config = useRuntimeConfig()
        const url = make
          ? `${config.public.apiBase}/models?make=${make}`
          : `${config.public.apiBase}/models`

        const response = await $fetch<{ data: string[] }>(url)
        this.availableModels = response.data
      } catch (err: any) {
        console.error('Error fetching models:', err)
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
    },

    setPage(page: number) {
      this.filters.page = page
      this.fetchVehicles()
    },

    nextPage() {
      if (this.metadata && this.filters.page! < this.metadata.last_page) {
        this.filters.page = (this.filters.page || 1) + 1
        this.fetchVehicles()
      }
    },

    previousPage() {
      if (this.filters.page && this.filters.page > 1) {
        this.filters.page -= 1
        this.fetchVehicles()
      }
    }
  }
})
