<template>
  <div class="vehicle-list">
    <div v-if="!vehicles || vehicles.length === 0" class="no-results">
      <p>No vehicles found. Try adjusting your filters.</p>
    </div>

    <div v-else class="vehicle-grid">
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle.vehicle_id"
        :vehicle="vehicle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

defineProps<{
  vehicles: Vehicle[]
}>()
</script>

<style lang="scss" scoped>
.vehicle-list {
  margin-bottom: $spacing-xl;
}

.no-results {
  text-align: center;
  padding: $spacing-xxl;
  background: $white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;

  p {
    font-size: $font-size-lg;
    color: $text-light;
  }
}

.vehicle-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
