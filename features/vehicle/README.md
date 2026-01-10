# Vehicle Feature

This feature module contains all vehicle-related functionality following a feature-first architecture.

## Structure

```
vehicle/S
├── components/                     # Feature-specific components
│   ├── VehicleCard.vue             # Template
│   ├── VehicleCard.ts              # Logic & types
│   ├── VehicleFilters.vue
│   ├── VehicleFilters.ts
│   └── ...
├── composables/                    # Shared composables
│   └── useVehicleFormatting.ts
├── types/                          # TypeScript types
└── utils/                          # Utility functions
```

## Component Structure

Each component follows the separation of concerns pattern:

- **`.vue` file**: Template only (HTML + minimal script setup)
- **`.ts` file**: Logic, computed properties, methods, types
- **`.scss` file**: Styles (in `assets/styles/components/`)

## Benefits

- ✅ Clear separation of template, logic, and styles
- ✅ Better testability (logic can be tested independently)
- ✅ Improved code organisation
- ✅ Easier to navigate and maintain
- ✅ Feature-based instead of type-based organisation
