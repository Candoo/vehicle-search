<template>
  <div class="vehicle-detail-page">
    <div class="container">
      <NuxtLink to="/" class="back-link">
        ← Back to Search
      </NuxtLink>

      <div v-if="vehicleStore.loading" class="loading">
        <p>Loading vehicle details...</p>
      </div>

      <div v-else-if="vehicleStore.error" class="error">
        <p>{{ vehicleStore.error }}</p>
      </div>

      <VehicleDetail v-else-if="vehicle" :vehicle="vehicle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVehicleStore } from '~/stores/vehicle'

const route = useRoute()
const vehicleStore = useVehicleStore()

const vehicle = computed(() => vehicleStore.currentVehicle)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    await vehicleStore.fetchVehicleById(id)
  }
})
</script>

<style lang="scss" scoped>
.vehicle-detail-page {
  padding: $spacing-xl 0;
}

.back-link {
  display: inline-block;
  margin-bottom: $spacing-lg;
  color: $primary-color;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
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
