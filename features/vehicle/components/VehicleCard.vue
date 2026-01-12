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
  allImages,
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

// Favorite state
const isFavorite = ref(false)
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

// Track failed mobile gallery images
const failedMobileImages = ref<Set<string>>(new Set())
const handleMobileImageError = (imgSrc: string) => {
  failedMobileImages.value.add(imgSrc)
}
</script>

<template>
  <article class="card">
    <div class="image">
      <!-- Mobile: horizontal scrollable gallery -->
      <div class="mobile-gallery">
        <template v-if="allImages.length > 0">
          <template v-for="(imgSrc, index) in allImages" :key="imgSrc">
            <img
              v-if="!failedMobileImages.has(imgSrc)"
              :src="imgSrc"
              :alt="`${vehicle.make} ${vehicle.model} - Image ${index + 1}`"
              class="mobile-gallery-img"
              loading="lazy"
              decoding="async"
              @error="handleMobileImageError(imgSrc)"
            />
          </template>
        </template>
        <div v-if="allImages.length === 0 || failedMobileImages.size === allImages.length" class="mobile-no-image">No Image</div>
      </div>

      <!-- Desktop: single image with carousel -->
      <div class="desktop-image">
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
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11L2.7071 6.70706C2.31658 6.31653 2.31659 5.68337 2.70711 5.29284L7 1"
                stroke="currentColor"
                stroke-width="2"
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
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 1L7.2929 5.29294C7.68342 5.68347 7.68342 6.31663 7.29289 6.70716L3 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="info">
      <div class="header">
        <h3 class="name">
          <NuxtLink :to="`/vehicles/${vehicle.vehicle_id}`" class="stretched-link">
            {{ vehicle.year }} ({{ vehicle.model_year || vehicle.year.slice(-2) }}) {{ vehicle.make }} {{ vehicle.model }}
          </NuxtLink>
        </h3>
        <div class="header-actions">
          <!-- Mobile classification badge -->
          <span class="classification-badge-mobile" :class="classificationClass">
            {{ vehicle.advert_classification }}
          </span>
          <button
            type="button"
            class="favorite-btn"
            :class="{ active: isFavorite }"
            :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            @click.prevent="toggleFavorite"
          >
            <!-- Active state (filled) -->
            <svg 
              v-if="isFavorite" 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7.43481 0.690965C7.73416 -0.230346 9.03757 -0.230344 9.33692 0.690967L10.631 4.67375C10.7649 5.08577 11.1488 5.36473 11.5821 5.36473H15.7698C16.7385 5.36473 17.1413 6.60434 16.3576 7.17375L12.9696 9.63524C12.6191 9.88988 12.4725 10.3413 12.6064 10.7533L13.9004 14.7361C14.1998 15.6574 13.1453 16.4235 12.3616 15.8541L8.97365 13.3926C8.62316 13.1379 8.14857 13.1379 7.79808 13.3926L4.41012 15.8541C3.62641 16.4235 2.57193 15.6574 2.87128 14.7361L4.16537 10.7533C4.29924 10.3412 4.15258 9.88988 3.80209 9.63524L0.414139 7.17374C-0.369575 6.60434 0.0332026 5.36473 1.00193 5.36473H5.18967C5.62289 5.36473 6.00685 5.08577 6.14072 4.67375L7.43481 0.690965Z" 
                fill="currentColor"
                stroke="transparent"
              />
            </svg>
            <!-- Inactive state (outline) -->
            <svg 
              v-else 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7.93578 1.19096C8.23514 0.269654 9.53855 0.269656 9.8379 1.19097L11.132 5.17375C11.2659 5.58577 11.6498 5.86473 12.083 5.86473H16.2708C17.2395 5.86473 17.6423 7.10434 16.8586 7.67375L13.4706 10.1352C13.1201 10.3899 12.9735 10.8413 13.1073 11.2533L14.4014 15.2361C14.7008 16.1574 13.6463 16.9235 12.8626 16.3541L9.47463 13.8926C9.12414 13.6379 8.64954 13.6379 8.29906 13.8926L4.9111 16.3541C4.12739 16.9235 3.07291 16.1574 3.37226 15.2361L4.66634 11.2533C4.80022 10.8412 4.65356 10.3899 4.30307 10.1352L0.915115 7.67374C0.131402 7.10434 0.534179 5.86473 1.5029 5.86473H5.69064C6.12387 5.86473 6.50783 5.58577 6.6417 5.17375L7.93578 1.19096Z" 
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <p class="derivative">{{ vehicle.derivative }}</p>

      <!-- Mobile specs -->
       <div class="footer-grid">
        <div class="mobile-specs">
          <div class="spec-row">
            <span>{{ formatMileage(vehicle.odometer_value) }}</span>
            <span>{{ vehicle.fuel_type }}</span>
          </div>
          <div class="spec-row">
            <span>{{ vehicle.transmission }}</span>
            <span>{{ vehicle.body_type }}</span>
          </div>
        </div>
        <div class="footer">
          <div class="price-details">
            <div class="price">
              <span class="price-value">£{{ formatPrice(vehicle.monthly_payment) }}</span>
              <span class="price-meta">/mo ({{ vehicle.monthly_finance_type }})</span>
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
    </div>
  </article>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_vehicle-card.scss"></style>
