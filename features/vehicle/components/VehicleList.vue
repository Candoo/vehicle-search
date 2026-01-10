<script setup lang="ts">
import type { VehicleListProps } from './VehicleList'
import { useVehicleList } from './VehicleList'
import VehicleCard from './VehicleCard.vue'

const props = defineProps<VehicleListProps>()

const { showNoResults } = useVehicleList(props)
</script>

<template>
  <section class="vehicle-list" aria-label="Vehicle search results">
    <div v-if="showNoResults" class="no-results" role="status">
      
      <h2>No vehicles found</h2>
      <p>Try adjusting your filters to see more results.</p>
      <div class="no-results-illustration">
        <svg class="no-results-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path 
            fill="currentColor" 
            d="M46.7,-52.9C59.1,-45.2,66.8,-29.2,72,-11C77.2,7.1,79.9,27.4,70.8,38.8C61.8,50.2,41,52.8,22.5,57.8C4,62.8,-12.1,70.2,-28.9,68.7C-45.7,67.3,-63.2,56.9,-67.7,42.4C-72.1,27.9,-63.4,9.1,-55.6,-5.3C-47.7,-19.8,-40.7,-29.9,-31.5,-38.2C-22.4,-46.5,-11.2,-53,3,-56.5C17.1,-60.1,34.2,-60.6,46.7,-52.9Z" 
            transform="translate(100 100) scale(1)"
          ></path>
        </svg>
        <img src="~/assets/images/no-results.png" alt="No results found" class="no-results-image" />
      </div>
    </div>

    <div v-else class="vehicle-grid" role="list">
      <VehicleCard v-for="vehicle in props.vehicles" :key="vehicle.vehicle_id" :vehicle="vehicle" />
    </div>
  </section>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_vehicle-list.scss"></style>
