<template>
  <div v-if="vehicleStore.totalPages > 1" class="pagination">
    <button
      class="pagination-btn"
      :disabled="vehicleStore.currentPage === 1"
      @click="vehicleStore.previousPage()"
    >
      ← Previous
    </button>

    <div class="pagination-info">
      <span>Page {{ vehicleStore.currentPage }} of {{ vehicleStore.totalPages }}</span>
    </div>

    <button
      class="pagination-btn"
      :disabled="vehicleStore.currentPage === vehicleStore.totalPages"
      @click="vehicleStore.nextPage()"
    >
      Next →
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'

const vehicleStore = useVehicleStore()
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-lg;
  padding: $spacing-xl 0;
}

.pagination-btn {
  padding: $spacing-sm $spacing-lg;
  background-color: $white;
  color: $primary-color;
  border: 2px solid $primary-color;
  border-radius: $border-radius;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover:not(:disabled) {
    background-color: $primary-color;
    color: $white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: $border-color;
    color: $text-light;
  }
}

.pagination-info {
  font-size: $font-size-base;
  color: $text-color;
  font-weight: 500;
  min-width: 150px;
  text-align: center;
}
</style>
