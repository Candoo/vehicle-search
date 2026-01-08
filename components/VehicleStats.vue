<template>
  <div class="vehicle-stats">
    <div class="stat-card">
      <div class="stat-value">{{ vehicleStore.totalVehicles }}</div>
      <div class="stat-label">Total Vehicles</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ vehicleStore.newVehiclesCount }}</div>
      <div class="stat-label">New</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ vehicleStore.usedVehiclesCount }}</div>
      <div class="stat-label">Used</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ vehicleStore.offerVehiclesCount }}</div>
      <div class="stat-label">Special Offers</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'

const vehicleStore = useVehicleStore()
</script>

<style lang="scss" scoped>
.vehicle-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
}

.stat-card {
  background: $white;
  padding: $spacing-lg;
  border-radius: $border-radius;
  box-shadow: $shadow-sm;
  text-align: center;
  transition: transform $transition-fast, box-shadow $transition-fast;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow;
  }
}

.stat-value {
  font-size: $font-size-xxl;
  font-weight: 600;
  color: $primary-color;
  margin-bottom: $spacing-xs;
}

.stat-label {
  font-size: $font-size-sm;
  color: $text-light;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
