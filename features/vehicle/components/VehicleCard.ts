import type { Vehicle } from '../types'
import { useVehicleFormatting } from '../composables/useVehicleFormatting'

export interface VehicleCardProps {
  vehicle: Vehicle
}

export const useVehicleCard = (props: VehicleCardProps) => {
  const { formatPrice, formatMileage } = useVehicleFormatting()
  const router = useRouter()

  const currentImageIndex = ref(0)
  const imageError = ref(false)
  const imageLoaded = ref(false)
  const slideDirection = ref<'forward' | 'backward'>('forward')
  const hasInteracted = ref(false)

  const classificationClass = computed(() => {
    return props.vehicle.advert_classification.toLowerCase() === 'new'
      ? 'classification-new'
      : 'classification-used'
  })

  const totalImages = computed(() => {
    return props.vehicle.media_urls?.length || 0
  })

  const hasMultipleImages = computed(() => {
    return totalImages.value > 1
  })

  const currentImage = computed(() => {
    if (!props.vehicle.media_urls || props.vehicle.media_urls.length === 0) {
      return null
    }
    return props.vehicle.media_urls[currentImageIndex.value]?.medium || null
  })

  const allImages = computed(() => {
    if (!props.vehicle.media_urls || props.vehicle.media_urls.length === 0) {
      return []
    }
    return props.vehicle.media_urls.map(media => media.medium).filter(Boolean)
  })

  const handleImageError = () => {
    imageError.value = true
    imageLoaded.value = false
  }

  const handleImageLoad = () => {
    imageLoaded.value = true
    imageError.value = false
  }

  const nextImage = () => {
    hasInteracted.value = true
    slideDirection.value = 'forward'
    imageLoaded.value = false
    if (currentImageIndex.value < totalImages.value - 1) {
      currentImageIndex.value++
    } else {
      currentImageIndex.value = 0
    }
    imageError.value = false
  }

  const previousImage = () => {
    hasInteracted.value = true 
    slideDirection.value = 'backward'
    imageLoaded.value = false
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--
    } else {
      currentImageIndex.value = totalImages.value - 1
    }
    imageError.value = false
  }

  const goToVehicle = () => {
    router.push(`/vehicles/${props.vehicle.vehicle_id}`)
  }

  return {
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
  }
}
