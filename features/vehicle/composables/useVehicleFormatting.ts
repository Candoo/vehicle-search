/**
 * Composable for vehicle data formatting utilities
 */
export const useVehicleFormatting = () => {
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

  return {
    formatPrice,
    formatMileage,
    formatDate
  }
}
