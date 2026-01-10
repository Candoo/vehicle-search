export interface MediaURL {
  large: string
  medium: string
  thumb: string
}

export interface Vehicle {
  vehicle_id: number
  advert_classification: string
  attention_grabber: string | null
  body_type: string
  body_type_slug: string
  colour: string
  company: string
  date_first_registered: string
  derivative: string
  description: string
  doors: string
  drivetrain: string
  extra_description: string
  fuel_type: string
  fuel_type_slug: string
  insurance_group: string
  location: string
  location_slug: string
  make: string
  make_slug: string
  model: string
  model_year: string | null
  name: string
  odometer_units: string
  odometer_value: number
  original_price: string
  plate: string
  previous_keepers: number
  price: string
  price_ex_vat: string
  price_when_new: string
  range: string
  range_slug: string
  reserved: string
  seats: string
  site: string
  site_slug: string
  slug: string
  status: string
  stock_id: string
  tax_rate_value: string | null
  transmission: string
  vat: string
  vat_scheme: string
  vat_when_new: string
  vin: string
  vrm: string
  year: string
  media_urls: MediaURL[]
  banner_images: string[]
  key_features: string[]
  monthly_payment: string
  monthly_finance_type: string
  has_offer: boolean
  created_at: string
  updated_at: string
}

export interface ResponseMetadata {
  current_page: number
  last_page: number
  per_page: number
  total: number
  all_total?: number
  total_new_vehicles?: number
  total_used_vehicles?: number
  offer_vehicles?: number
}

export interface VehiclesResponse {
  data: Vehicle[]
  meta: ResponseMetadata
}

export interface VehicleFilters {
  page?: number
  resultsPerPage?: number
  advertClassification?: string
  make?: string
  model?: string
  fuelType?: string
  transmission?: string
  bodyType?: string
  minPrice?: string
  maxPrice?: string
  minYear?: string
  maxYear?: string
}
