<template>
  <NuxtLink :to="`/vehicles/${vehicle.vehicle_id}`" class="vehicle-card">
    <div class="vehicle-image">
      <img
        v-if="vehicle.media_urls && vehicle.media_urls.length > 0"
        :src="vehicle.media_urls[0].medium"
        :alt="vehicle.name"
      >
      <div v-else class="no-image">No Image</div>

      <span v-if="vehicle.has_offer" class="offer-badge">Special Offer</span>
      <span class="classification-badge" :class="classificationClass">
        {{ vehicle.advert_classification }}
      </span>
    </div>

    <div class="vehicle-info">
      <h3 class="vehicle-name">{{ vehicle.make }} {{ vehicle.model }}</h3>
      <p class="vehicle-derivative">{{ vehicle.derivative }}</p>

      <div class="vehicle-details">
        <span class="detail-item">
          <strong>{{ vehicle.year }}</strong>
        </span>
        <span class="detail-item">
          {{ formatMileage(vehicle.odometer_value) }}
        </span>
        <span class="detail-item">
          {{ vehicle.transmission }}
        </span>
        <span class="detail-item">
          {{ vehicle.fuel_type }}
        </span>
      </div>

      <div class="vehicle-footer">
        <div class="price">
          <span class="price-label">Price:</span>
          <span class="price-value">£{{ formatPrice(vehicle.price) }}</span>
        </div>
        <div v-if="vehicle.monthly_payment" class="monthly-payment">
          <span class="payment-value">£{{ vehicle.monthly_payment }}</span>
          <span class="payment-label">/ month</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

const props = defineProps<{
  vehicle: Vehicle
}>()

const classificationClass = computed(() => {
  return props.vehicle.advert_classification.toLowerCase() === 'new'
    ? 'classification-new'
    : 'classification-used'
})

const formatPrice = (price: string): string => {
  return parseFloat(price).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const formatMileage = (mileage: number): string => {
  return `${mileage.toLocaleString()} miles`
}
</script>

<style lang="scss" scoped>
.vehicle-card {
  display: block;
  background: $white;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow;
  transition: transform $transition, box-shadow $transition;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }
}

.vehicle-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: $background-light;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: $text-light;
    font-size: $font-size-lg;
  }
}

.offer-badge {
  position: absolute;
  top: $spacing-sm;
  left: $spacing-sm;
  background-color: $error-color;
  color: $white;
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  font-weight: 600;
}

.classification-badge {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  color: $white;
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  font-weight: 600;
  text-transform: uppercase;

  &.classification-new {
    background-color: $success-color;
  }

  &.classification-used {
    background-color: $secondary-color;
  }
}

.vehicle-info {
  padding: $spacing-lg;
}

.vehicle-name {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.vehicle-derivative {
  font-size: $font-size-sm;
  color: $text-light;
  margin-bottom: $spacing-md;
}

.vehicle-details {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-color;

  .detail-item {
    font-size: $font-size-sm;
    color: $text-color;
    padding: $spacing-xs $spacing-sm;
    background-color: $background-light;
    border-radius: $border-radius-sm;
  }
}

.vehicle-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.price {
  display: flex;
  flex-direction: column;

  .price-label {
    font-size: $font-size-sm;
    color: $text-light;
    margin-bottom: $spacing-xs;
  }

  .price-value {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $primary-color;
  }
}

.monthly-payment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .payment-value {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-color;
  }

  .payment-label {
    font-size: $font-size-sm;
    color: $text-light;
  }
}
</style>
