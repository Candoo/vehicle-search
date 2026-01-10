<script setup lang="ts">
import type { VehicleCardProps } from './VehicleCard'
import { useVehicleCard } from './VehicleCard'

const props = defineProps<VehicleCardProps>()

const {
  classificationClass,
  formatPrice,
  formatMileage,
  currentImageIndex,
  totalImages,
  hasMultipleImages,
  currentImage,
  imageError,
  imageLoaded,
  slideDirection,
  hasInteracted,
  handleImageError,
  handleImageLoad,
  nextImage,
  previousImage,
  goToVehicle
} = useVehicleCard(props)

// Compute transition name based on direction
// Only use transition if user has interacted with carousel
const transitionName = computed(() => {
  if (!hasInteracted.value) return '' // No transition on initial load
  return slideDirection.value === 'forward' ? 'slide-forward' : 'slide-backward'
})
</script>

<template>
  <article class="vehicle-card">
    <div class="vehicle-image">
      <!-- Loading placeholder shown until image loads -->
      <div v-if="!imageLoaded && !imageError" class="image-placeholder"></div>

      <Transition :name="transitionName">
        <img
          v-if="currentImage && !imageError"
          v-show="imageLoaded"
          :key="currentImage"
          :src="currentImage"
          :alt="`${vehicle.make} ${vehicle.model} - ${vehicle.year}`"
          loading="eager"
          decoding="async"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div v-else-if="imageError" :key="'no-image'" class="no-image">No Image</div>
      </Transition>

      <!-- Classification badge -->
      <span class="classification-badge" :class="classificationClass">
        {{ vehicle.advert_classification }}
      </span>

      <!-- Image overlay pills -->
      <div class="image-pills">
        <span class="pill">{{ formatMileage(vehicle.odometer_value) }}</span>
        <span class="pill">{{ vehicle.fuel_type }}</span>
        <span class="pill">{{ vehicle.transmission }}</span>
        <span class="pill">{{ vehicle.body_type }}</span>
      </div>

      <!-- Image carousel controls -->
      <div v-if="hasMultipleImages" class="carousel-controls">
        <div class="image-counter">{{ currentImageIndex + 1 }} of {{ totalImages }}</div>
        <button
          type="button"
          class="carousel-btn carousel-prev"
          aria-label="Previous image"
          @click.prevent="previousImage"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="carousel-btn carousel-next"
          aria-label="Next image"
          @click.prevent="nextImage"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="vehicle-info">
      <h3 class="vehicle-name">
        <NuxtLink :to="`/vehicles/${vehicle.vehicle_id}`" class="stretched-link">
          {{ vehicle.year }} ({{ vehicle.model_year || vehicle.year.slice(-2) }}) {{ vehicle.make }} {{ vehicle.model }}
        </NuxtLink>
      </h3>
      <p class="vehicle-derivative">{{ vehicle.derivative }}</p>

      <div class="vehicle-footer">
        <div class="price-details">
          <div class="price">
            <span class="price-value">£{{ formatPrice(vehicle.price) }}</span>
            <span class="price-meta">/mo (PCP)</span>
          </div>
          <div v-if="vehicle.original_price" class="price-secondary">
            <span class="savings">£{{ formatPrice(vehicle.price_ex_vat) }}</span>
            <span class="strikethrough">£{{ formatPrice(vehicle.original_price) }}</span>
            <!-- <NuxtLink :to="`/finance/${vehicle.vehicle_id}`" class="finance-link">
              Calculate finance
            </NuxtLink> -->
          </div>
        </div>
        <div class="call-to-action">
            <button
              type="button"
              class="view-btn"
              aria-label="View vehicle details"
              @click.prevent="goToVehicle"
            >
              View
            </button>
          </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_vehicle-card.scss"></style>
