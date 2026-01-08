<template>
  <div class="vehicle-filters">
    <h2>Filter Vehicles</h2>

    <form @submit.prevent="handleSearch" class="filters-form">
      <div class="filters-grid">
        <div class="filter-group">
          <label for="classification">Classification</label>
          <select
            id="classification"
            v-model="localFilters.advertClassification"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="make">Make</label>
          <select
            id="make"
            v-model="localFilters.make"
            @change="onMakeChange"
          >
            <option value="">All Makes</option>
            <option
              v-for="make in vehicleStore.availableMakes"
              :key="make"
              :value="make"
            >
              {{ make }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="model">Model</label>
          <select
            id="model"
            v-model="localFilters.model"
            :disabled="!localFilters.make"
          >
            <option value="">All Models</option>
            <option
              v-for="model in vehicleStore.availableModels"
              :key="model"
              :value="model"
            >
              {{ model }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="fuelType">Fuel Type</label>
          <select id="fuelType" v-model="localFilters.fuelType">
            <option value="">All</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="transmission">Transmission</label>
          <select id="transmission" v-model="localFilters.transmission">
            <option value="">All</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="bodyType">Body Type</label>
          <select id="bodyType" v-model="localFilters.bodyType">
            <option value="">All</option>
            <option value="hatchback">Hatchback</option>
            <option value="saloon">Saloon</option>
            <option value="suv">SUV</option>
            <option value="estate">Estate</option>
            <option value="coupe">Coupe</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="minPrice">Min Price</label>
          <input
            id="minPrice"
            type="number"
            v-model="localFilters.minPrice"
            placeholder="Min"
            min="0"
          >
        </div>

        <div class="filter-group">
          <label for="maxPrice">Max Price</label>
          <input
            id="maxPrice"
            type="number"
            v-model="localFilters.maxPrice"
            placeholder="Max"
            min="0"
          >
        </div>

        <div class="filter-group">
          <label for="minYear">Min Year</label>
          <input
            id="minYear"
            type="number"
            v-model="localFilters.minYear"
            placeholder="Min"
            min="1900"
            :max="new Date().getFullYear()"
          >
        </div>

        <div class="filter-group">
          <label for="maxYear">Max Year</label>
          <input
            id="maxYear"
            type="number"
            v-model="localFilters.maxYear"
            placeholder="Max"
            min="1900"
            :max="new Date().getFullYear()"
          >
        </div>
      </div>

      <div class="filter-actions">
        <button type="submit" class="btn btn-primary">
          Search
        </button>
        <button type="button" class="btn btn-secondary" @click="handleReset">
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'
import type { VehicleFilters } from '~/types/vehicle'

const vehicleStore = useVehicleStore()

const localFilters = ref<VehicleFilters>({ ...vehicleStore.filters })

const onMakeChange = async () => {
  localFilters.value.model = ''
  if (localFilters.value.make) {
    await vehicleStore.fetchAvailableModels(localFilters.value.make)
  } else {
    vehicleStore.availableModels = []
  }
}

const handleSearch = async () => {
  vehicleStore.updateFilters({ ...localFilters.value, page: 1 })
  await vehicleStore.fetchVehicles()
}

const handleReset = async () => {
  vehicleStore.resetFilters()
  localFilters.value = { ...vehicleStore.filters }
  vehicleStore.availableModels = []
  await vehicleStore.fetchVehicles()
}
</script>

<style lang="scss" scoped>
.vehicle-filters {
  background: $white;
  padding: $spacing-lg;
  border-radius: $border-radius-lg;
  box-shadow: $shadow;
  margin-bottom: $spacing-xl;

  h2 {
    margin-bottom: $spacing-lg;
    font-size: $font-size-xl;
  }
}

.filters-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-md;

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(5, 1fr);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  label {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-color;
  }

  select,
  input {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: $font-size-base;
    transition: border-color $transition-fast;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }

    &:disabled {
      background-color: $background-light;
      cursor: not-allowed;
    }
  }
}

.filter-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: flex-end;
  padding-top: $spacing-md;
  border-top: 1px solid $border-color;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }
}

.btn {
  padding: $spacing-sm $spacing-xl;
  border: none;
  border-radius: $border-radius;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    transform: translateY(-1px);
    box-shadow: $shadow;
  }

  &:active {
    transform: translateY(0);
  }
}

.btn-primary {
  background-color: $primary-color;
  color: $white;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.btn-secondary {
  background-color: $background-light;
  color: $text-color;

  &:hover {
    background-color: darken($background-light, 5%);
  }
}
</style>
