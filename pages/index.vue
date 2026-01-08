<template>
  <div class="home-page">
    <div class="container">
      <header class="page-header">
        <h1>Vehicle Search</h1>
        <p class="text-light">Browse and search our inventory of vehicles</p>
      </header>

      <VehicleFilters />

      <div v-if="vehicleStore.loading" class="loading">
        <p>Loading vehicles...</p>
      </div>

      <div v-else-if="vehicleStore.error" class="error">
        <p>{{ vehicleStore.error }}</p>
      </div>

      <div v-else>
        <VehicleStats />
        <VehicleList :vehicles="vehicleStore.vehicles" />
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'

const vehicleStore = useVehicleStore()

// Fetch vehicles on mount
onMounted(async () => {
  await vehicleStore.fetchVehicles()
  await vehicleStore.fetchAvailableMakes()
})
</script>

<style lang="scss" scoped>
.home-page {
  padding: $spacing-xl 0;
}

.page-header {
  margin-bottom: $spacing-xl;
  text-align: center;

  h1 {
    margin-bottom: $spacing-sm;
  }
}

.loading,
.error {
  text-align: center;
  padding: $spacing-xxl;

  p {
    font-size: $font-size-lg;
  }
}

.error {
  color: $error-color;
}
</style>
