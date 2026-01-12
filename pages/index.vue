<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'
import { VehicleFilters, VehicleList, VehicleCardSkeleton } from '~/features/vehicle/components'

// Lazy load pagination component
const UiPagination = defineAsyncComponent(() => import('~/components/ui/Pagination.vue'))

const vehicleStore = useVehicleStore()

// Fetch vehicles on mount
onMounted(async () => {
  await vehicleStore.fetchVehicles()
})
</script>

<template>
  <main class="page">
    <header class="header">
      <div class="heading">
        <h1 v-if="vehicleStore.loading" class="count-skeleton"></h1>
        <h1 v-else class="count">Showing {{ vehicleStore.totalVehicles }} cars</h1>
      </div>
      <VehicleFilters />
    </header>
    <div class="container">
      <div v-if="vehicleStore.error" class="error" role="alert">
        <p>{{ vehicleStore.error }}</p>
      </div>
      <section v-else aria-label="Vehicle listings">
        <div v-if="vehicleStore.loading" class="skeleton-list">
          <div class="skeleton-grid">
            <VehicleCardSkeleton v-for="n in 12" :key="`skeleton-${n}`" />
          </div>
        </div>
        <template v-else>
          <VehicleList :vehicles="vehicleStore.filteredVehicles" :initial-load-complete="vehicleStore.initialLoadComplete" />
          <UiPagination />
        </template>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped src="~/assets/styles/pages/_index.scss"></style>
