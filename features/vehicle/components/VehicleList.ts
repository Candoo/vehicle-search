import type { Vehicle } from '../types'

export interface VehicleListProps {
  vehicles: Vehicle[]
  initialLoadComplete: boolean
}

export const useVehicleList = (props: VehicleListProps) => {
  const hasVehicles = computed(() => props.vehicles && props.vehicles.length > 0)
  const showNoResults = computed(() => props.initialLoadComplete && !hasVehicles.value)

  return {
    hasVehicles,
    showNoResults
  }
}
