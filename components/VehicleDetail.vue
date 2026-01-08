<template>
  <div class="vehicle-detail">
    <div class="vehicle-header">
      <h1>{{ vehicle.make }} {{ vehicle.model }}</h1>
      <p class="derivative">{{ vehicle.derivative }}</p>
    </div>

    <div class="vehicle-content">
      <div class="vehicle-gallery">
        <div v-if="vehicle.media_urls && vehicle.media_urls.length > 0" class="main-image">
          <img
            :src="currentImage"
            :alt="vehicle.name"
          >
        </div>
        <div v-else class="no-image">No Images Available</div>

        <div v-if="vehicle.media_urls && vehicle.media_urls.length > 1" class="thumbnail-list">
          <img
            v-for="(media, index) in vehicle.media_urls.slice(0, 6)"
            :key="index"
            :src="media.thumb"
            :alt="`${vehicle.name} - ${index + 1}`"
            :class="{ active: currentImageIndex === index }"
            @click="currentImageIndex = index"
          >
        </div>
      </div>

      <div class="vehicle-summary">
        <div class="price-section">
          <span class="price-label">Price</span>
          <span class="price-value">£{{ formatPrice(vehicle.price) }}</span>
          <span v-if="vehicle.monthly_payment" class="monthly-payment">
            or £{{ vehicle.monthly_payment }} / month
          </span>
        </div>

        <div class="key-specs">
          <div class="spec-item">
            <span class="spec-label">Year</span>
            <span class="spec-value">{{ vehicle.year }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Mileage</span>
            <span class="spec-value">{{ formatMileage(vehicle.odometer_value) }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Fuel Type</span>
            <span class="spec-value">{{ vehicle.fuel_type }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Transmission</span>
            <span class="spec-value">{{ vehicle.transmission }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Body Type</span>
            <span class="spec-value">{{ vehicle.body_type }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Colour</span>
            <span class="spec-value">{{ vehicle.colour }}</span>
          </div>
        </div>

        <div v-if="vehicle.key_features && vehicle.key_features.length > 0" class="key-features">
          <h3>Key Features</h3>
          <ul>
            <li v-for="(feature, index) in vehicle.key_features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="vehicle-full-specs">
      <h2>Full Specification</h2>
      <div class="specs-grid">
        <div class="spec-group">
          <h3>Vehicle Details</h3>
          <div class="spec-row">
            <span>Registration</span>
            <span>{{ vehicle.vrm }}</span>
          </div>
          <div class="spec-row">
            <span>Plate</span>
            <span>{{ vehicle.plate }}</span>
          </div>
          <div class="spec-row">
            <span>VIN</span>
            <span>{{ vehicle.vin }}</span>
          </div>
          <div class="spec-row">
            <span>Stock ID</span>
            <span>{{ vehicle.stock_id }}</span>
          </div>
          <div class="spec-row">
            <span>Classification</span>
            <span>{{ vehicle.advert_classification }}</span>
          </div>
          <div class="spec-row">
            <span>Status</span>
            <span>{{ vehicle.reserved }}</span>
          </div>
        </div>

        <div class="spec-group">
          <h3>Performance</h3>
          <div class="spec-row">
            <span>Doors</span>
            <span>{{ vehicle.doors }}</span>
          </div>
          <div class="spec-row">
            <span>Seats</span>
            <span>{{ vehicle.seats }}</span>
          </div>
          <div class="spec-row">
            <span>Drivetrain</span>
            <span>{{ vehicle.drivetrain }}</span>
          </div>
          <div class="spec-row">
            <span>Insurance Group</span>
            <span>{{ vehicle.insurance_group }}</span>
          </div>
        </div>

        <div class="spec-group">
          <h3>History</h3>
          <div class="spec-row">
            <span>First Registered</span>
            <span>{{ formatDate(vehicle.date_first_registered) }}</span>
          </div>
          <div class="spec-row">
            <span>Previous Keepers</span>
            <span>{{ vehicle.previous_keepers }}</span>
          </div>
          <div class="spec-row">
            <span>Price When New</span>
            <span>£{{ formatPrice(vehicle.price_when_new) }}</span>
          </div>
        </div>

        <div class="spec-group">
          <h3>Location</h3>
          <div class="spec-row">
            <span>Site</span>
            <span>{{ vehicle.site }}</span>
          </div>
          <div class="spec-row">
            <span>Location</span>
            <span>{{ vehicle.location }}</span>
          </div>
          <div class="spec-row">
            <span>Company</span>
            <span>{{ vehicle.company }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="vehicle.description" class="vehicle-description">
      <h2>Description</h2>
      <p>{{ vehicle.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

const props = defineProps<{
  vehicle: Vehicle
}>()

const currentImageIndex = ref(0)

const currentImage = computed(() => {
  if (props.vehicle.media_urls && props.vehicle.media_urls.length > 0) {
    return props.vehicle.media_urls[currentImageIndex.value].large
  }
  return ''
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

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style lang="scss" scoped>
.vehicle-detail {
  background: $white;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow-lg;
}

.vehicle-header {
  padding: $spacing-xl;
  background: linear-gradient(135deg, $primary-color 0%, darken($primary-color, 10%) 100%);
  color: $white;

  h1 {
    margin-bottom: $spacing-sm;
    font-size: 2rem;
  }

  .derivative {
    font-size: $font-size-lg;
    opacity: 0.9;
  }
}

.vehicle-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-xl;
  padding: $spacing-xl;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 2fr 1fr;
  }
}

.vehicle-gallery {
  .main-image {
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: $border-radius;
    margin-bottom: $spacing-md;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 400px;
    background-color: $background-light;
    border-radius: $border-radius;
    color: $text-light;
    font-size: $font-size-xl;
  }

  .thumbnail-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: $spacing-sm;

    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
      border-radius: $border-radius-sm;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color $transition-fast;

      &:hover {
        border-color: $primary-color;
      }

      &.active {
        border-color: $primary-color;
      }
    }
  }
}

.vehicle-summary {
  .price-section {
    background: $background-light;
    padding: $spacing-lg;
    border-radius: $border-radius;
    margin-bottom: $spacing-lg;
    text-align: center;

    .price-label {
      display: block;
      font-size: $font-size-sm;
      color: $text-light;
      margin-bottom: $spacing-xs;
    }

    .price-value {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: $primary-color;
      margin-bottom: $spacing-xs;
    }

    .monthly-payment {
      display: block;
      font-size: $font-size-base;
      color: $text-color;
    }
  }

  .key-specs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-lg;

    .spec-item {
      display: flex;
      flex-direction: column;
      gap: $spacing-xs;

      .spec-label {
        font-size: $font-size-sm;
        color: $text-light;
      }

      .spec-value {
        font-size: $font-size-base;
        font-weight: 600;
        color: $text-color;
      }
    }
  }

  .key-features {
    h3 {
      font-size: $font-size-lg;
      margin-bottom: $spacing-md;
    }

    ul {
      list-style: none;

      li {
        padding: $spacing-sm 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
        }

        &::before {
          content: '✓';
          color: $primary-color;
          font-weight: bold;
          margin-right: $spacing-sm;
        }
      }
    }
  }
}

.vehicle-full-specs {
  padding: $spacing-xl;
  border-top: 1px solid $border-color;

  h2 {
    margin-bottom: $spacing-lg;
  }

  .specs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    .spec-group {
      h3 {
        font-size: $font-size-lg;
        margin-bottom: $spacing-md;
        color: $primary-color;
      }

      .spec-row {
        display: flex;
        justify-content: space-between;
        padding: $spacing-sm 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
        }

        span:first-child {
          color: $text-light;
          font-size: $font-size-sm;
        }

        span:last-child {
          font-weight: 500;
          color: $text-color;
        }
      }
    }
  }
}

.vehicle-description {
  padding: $spacing-xl;
  border-top: 1px solid $border-color;

  h2 {
    margin-bottom: $spacing-md;
  }

  p {
    line-height: 1.8;
    color: $text-color;
  }
}
</style>
