# Project Architecture

This project follows a **feature-first architecture** with clear separation of concerns.

## Directory Structure

```
vehicle-search/
├── assets/
│   └── styles/                             # Global styles and component-specific SCSS
│       ├── components/                     # Component stylesheets
│       │   ├── _pagination.scss
│       │   ├── _vehicle-card.scss
│       │   ├── _vehicle-filters.scss
│       │   └── _vehicle-list.scss
│       ├── pages/                          # Page stylesheets
│       │   └── _index.scss
│       ├── _variables.scss                 # SCSS variables
│       └── main.scss                       # Global styles
├── components/
│   └── ui/                                 # Generic/reusable UI components
│       └── Pagination.vue
├── features/                               # Feature modules
│   └── vehicle/                            # Vehicle feature
│       ├── components/                     # Feature-specific components
│       │   ├── VehicleCard.vue             # Template
│       │   ├── VehicleCard.ts              # Logic & types
│       │   ├── VehicleFilters.vue          # Template
│       │   ├── VehicleFilters.ts           # Logic & types
│       │   ├── VehicleDetail.vue           # Simplified (inline styles)
│       │   ├── VehicleList.vue             # Template
│       │   ├── VehicleList.ts              # Logic & types
│       │   └── index.ts                    # Barrel exports
│       ├── composables/                    # Shared composables
│       │   └── useVehicleFormatting.ts
│       ├── types/                          # Feature-specific types
│       │   └── index.ts                    # Vehicle type definitions
│       └── README.md                       # Feature documentation
├── pages/                                  # Route pages
│   ├── index.vue                           # Home page
│   └── vehicles/
│       └── [id].vue                        # Vehicle detail page
├── stores/                                 # Pinia stores
│   └── vehicle.ts                          # Vehicle state management
└── nuxt.config.ts                          # Nuxt configuration
```

## Component Architecture

Most components follow the **separation of concerns pattern**:

### 1. Template (`.vue` file)

- **Pure HTML** with minimal logic
- Uses computed properties and methods from the logic file
- Imports its corresponding `.ts` file

### 2. Logic (`.ts` file)

- **Props interface** definition
- **Composable function** that encapsulates:
  - Computed properties
  - Methods/functions
  - State management
- Returns everything the template needs
- **Fully testable** without DOM

### 3. Styles (`.scss` file in `assets/styles/`)

- **Scoped styles** for the component
- Uses global SCSS variables
- Separate from logic and template

### Exception: Simplified Components

**VehicleDetail** is intentionally simplified with inline styles and props:
- Displays raw API response for debugging/testing purposes
- No separate `.ts` logic file needed
- Inline scoped styles (not complex enough to warrant external file)
- This is an exception for out-of-scope functionality

## Example: VehicleCard Component

**VehicleCard.vue** (Template):

```vue
<script setup lang="ts">
import type { VehicleCardProps } from './VehicleCard'
import { useVehicleCard } from './VehicleCard'

const props = defineProps<VehicleCardProps>()
const { classificationClass, formatPrice, formatMileage } = useVehicleCard(props)
</script>

<template>
  <NuxtLink :to="`/vehicles/${vehicle.vehicle_id}`" class="vehicle-card">
    <!-- template HTML -->
  </NuxtLink>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_vehicle-card.scss"></style>
```

**VehicleCard.ts** (Logic):

```typescript
import type { Vehicle } from '../types'
import { useVehicleFormatting } from '../composables/useVehicleFormatting'

export interface VehicleCardProps {
  vehicle: Vehicle
}

export const useVehicleCard = (props: VehicleCardProps) => {
  const { formatPrice, formatMileage } = useVehicleFormatting()

  const classificationClass = computed(() => {
    return props.vehicle.advert_classification.toLowerCase() === 'new'
      ? 'classification-new'
      : 'classification-used'
  })

  return {
    classificationClass,
    formatPrice,
    formatMileage
  }
}
```

**\_vehicle-card.scss** (Styles):

```scss
@use '../variables' as *;

.vehicle-card {
  display: block;
  background: $white;
  // ... more styles
}
```

## Benefits

### ✅ Separation of Concerns

- Template, logic, and styles are completely separate
- Each file has a single responsibility
- Easier to reason about and maintain

### ✅ Testability

- Logic can be unit tested without mounting components
- Test computed properties and methods in isolation
- Mock dependencies easily

### ✅ Reusability

- Composables like `useVehicleFormatting` can be shared
- Logic can be reused across components
- Easier to extract common functionality

### ✅ Feature Organisation

- Related code is co-located in feature folders (components, types, composables)
- Clear boundaries between features
- Scales better than type-based organisation
- Each feature is self-contained with its own types

### ✅ Type Safety

- Full TypeScript support
- Props interfaces are explicit
- Better IDE autocomplete and error checking

### ✅ Better Developer Experience

- Smaller, focused files
- Easier navigation
- Clear imports/exports
- Self-documenting code structure

## Importing Components

### From Pages:

```typescript
import { VehicleCard, VehicleList, VehicleFilters } from '~/features/vehicle/components'
import UiPagination from '~/components/ui/Pagination.vue'
```

### From Other Components:

```typescript
import VehicleCard from './VehicleCard.vue'
import { useVehicleFormatting } from '../composables/useVehicleFormatting'
```

## Testing Strategy

### Unit Tests (Logic):

```typescript
// VehicleCard.spec.ts
import { useVehicleCard } from './VehicleCard'

describe('useVehicleCard', () => {
  it('should format classification class correctly', () => {
    const props = { vehicle: { advert_classification: 'New', ... } }
    const { classificationClass } = useVehicleCard(props)
    expect(classificationClass.value).toBe('classification-new')
  })
})
```

### Component Tests (Integration):

```typescript
// VehicleCard.component.spec.ts
import { mount } from '@vue/test-utils'
import VehicleCard from './VehicleCard.vue'

describe('VehicleCard Component', () => {
  it('should render vehicle details', () => {
    const wrapper = mount(VehicleCard, {
      props: { vehicle: mockVehicle }
    })
    expect(wrapper.text()).toContain(mockVehicle.make)
  })
})
```

## Adding New Features

1. Create a new feature folder: `features/[feature-name]/`
2. Create subdirectories:
   - `components/` - Vue components with separated `.vue` and `.ts` files
   - `types/` - TypeScript interfaces and types
   - `composables/` - Shared logic and reusable functions
3. Export components from `components/index.ts` barrel file
4. Export types from `types/index.ts` barrel file
5. Document the feature in `README.md`