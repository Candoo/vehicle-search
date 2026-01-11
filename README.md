# Vehicle Search

A modern, responsive vehicle search application built with Nuxt 3, Vue 3, TypeScript, SCSS, and Pinia.

## Features

- Browse and search vehicle inventory
- Quick filters (All, Used, New, Offers)
- Responsive design for mobile, tablet, and desktop
- Image carousel with directional transitions
- Loading skeletons for smooth UX
- Numbered pagination with navigation controls
- State management with Pinia
- Full TypeScript support

## Tech Stack

- **Framework**: Nuxt 3
- **UI Framework**: Vue 3
- **Language**: TypeScript
- **Styling**: SCSS
- **State Management**: Pinia
- **Build Tool**: Vite

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Vehicle API running (see [vehicles-api](https://github.com/Candoo/vehicles-api))

## Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/Candoo/vehicle-search.git
cd vehicle-search
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment** (optional)

Copy `.env.example` to `.env` and update if needed:

```bash
cp .env.example .env
```

Default API base URL is `http://localhost:8080`

4. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Fix auto-fixable linting issues
- `npm run format` - Format all files with Prettier

## Architecture

This project follows a **feature-first architecture** with separation of concerns. See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## Project Structure

```
vehicle-search/
├── assets/
│   ├── images/          # Static images
│   └── styles/          # SCSS stylesheets
│       ├── components/  # Component-specific styles
│       ├── pages/       # Page-specific styles
│       ├── _variables.scss
│       └── main.scss
├── components/ui/       # Generic/reusable UI components
├── features/vehicle/    # Vehicle feature module
│   ├── components/      # Feature components (.vue + .ts files)
│   ├── composables/     # Shared composables
│   └── types/           # Feature-specific types
├── pages/               # Route pages
├── stores/              # Pinia state management
└── nuxt.config.ts       # Nuxt configuration
```

**Key Architecture Features:**

- Feature-based organisation (not type-based)
- Separated `.vue` templates and `.ts` logic files
- External SCSS files for all styling
- Composables for reusable logic
- Barrel exports for clean imports

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete details.

## Features Overview

### Vehicle List Page

- Responsive grid layout of vehicle cards
- Quick filter buttons (All, Used, New, Offers)
- Loading skeletons during data fetch
- Numbered pagination with first/prev/next/last controls
- No results state with illustration

### Vehicle Cards

- Image carousel with prev/next navigation
- Directional slide transitions
- Classification badge (New/Used)
- Vehicle specs pills (fuel type, transmission, mileage, year)
- Pricing with optional offer display
- Stretched link for full card clickability

### Filtering

Current filtering options:

| Filter  | Description                              |
| ------- | ---------------------------------------- |
| All     | Show all vehicles                        |
| Used    | Filter by used vehicles (API parameter)  |
| New     | Filter by new vehicles (API parameter)   |
| Offers  | Filter vehicles with offers (client-side)|

## API Integration

The application connects to the Vehicle API. Configure the API base URL in `.env`:

```env
NUXT_PUBLIC_API_BASE=http://localhost:8080
```

For production, set the environment variable to your production API URL.

## Building for Production

1. **Build the application**

```bash
npm run build
```

2. **Preview the build**

```bash
npm run preview
```

3. **Generate static site** (optional)

```bash
npm run generate
```

This creates a `.output/public` directory with static files.

## Deployment

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run generate
# Upload .output/public directory to Netlify
```

## Environment Variables

| Variable               | Description          | Default                 |
| ---------------------- | -------------------- | ----------------------- |
| `NUXT_PUBLIC_API_BASE` | Vehicle API base URL | `http://localhost:8080` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Related Projects

- [Vehicle API](https://github.com/Candoo/vehicles-api) - Backend API for vehicle data
