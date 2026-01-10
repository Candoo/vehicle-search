<script setup lang="ts">
import { useVehicleFilters } from './VehicleFilters'

const { activeFilter, setFilter } = useVehicleFilters()
</script>

<template>
  <nav class="vehicle-filters" aria-label="Vehicle filters">
    <div class="filter-buttons" role="group" aria-label="Filter by classification">
      <button
        type="button"
        :class="['filter-btn', { active: activeFilter === 'all' }]"
        :aria-pressed="activeFilter === 'all'"
        @click="setFilter('all')"
      >
        All
      </button>
      <button
        type="button"
        :class="['filter-btn', { active: activeFilter === 'used' }]"
        :aria-pressed="activeFilter === 'used'"
        @click="setFilter('used')"
      >
        Used
      </button>
      <button
        type="button"
        :class="['filter-btn', { active: activeFilter === 'new' }]"
        :aria-pressed="activeFilter === 'new'"
        @click="setFilter('new')"
      >
        New
      </button>
      <button
        type="button"
        :class="['filter-btn', { active: activeFilter === 'offers' }]"
        :aria-pressed="activeFilter === 'offers'"
        @click="setFilter('offers')"
      >
        Offers
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_vehicle-filters.scss"></style>
