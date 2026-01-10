import { useVehicleStore } from '~/stores/vehicle'

export const useVehicleFilters = () => {
  const vehicleStore = useVehicleStore()

  // Compute active filter based on current store state
  const activeFilter = computed(() => {
    if (vehicleStore.clientFilter === 'offers') {
      return 'offers'
    }
    if (vehicleStore.filters.advertClassification === 'new') {
      return 'new'
    }
    if (vehicleStore.filters.advertClassification === 'used') {
      return 'used'
    }
    return 'all'
  })

  const setFilter = async (filter: 'all' | 'used' | 'new' | 'offers') => {
    // Reset filters first
    vehicleStore.resetFilters()

    // Build new filters based on selection
    if (filter === 'new') {
      vehicleStore.updateFilters({ advertClassification: 'new', page: 1 })
    } else if (filter === 'used') {
      vehicleStore.updateFilters({ advertClassification: 'used', page: 1 })
    } else if (filter === 'offers') {
      // API doesn't support has_offer parameter, so filter client-side
      vehicleStore.clientFilter = 'offers'
      vehicleStore.updateFilters({ page: 1 })
    }
    // For 'all', just keep the reset filters

    await vehicleStore.fetchVehicles()
  }

  return {
    activeFilter,
    setFilter
  }
}
