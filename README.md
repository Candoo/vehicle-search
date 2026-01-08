# Vehicle Search

A modern, responsive vehicle search application built with Nuxt 3, Vue 3, TypeScript, SCSS, and Pinia.

## Features

- 🚗 Browse and search vehicle inventory
- 🔍 Advanced filtering (make, model, price, year, fuel type, transmission, body type)
- 📱 Responsive design for mobile, tablet, and desktop
- 📊 Real-time statistics (total vehicles, new/used counts, special offers)
- 🎨 Modern UI with SCSS styling
- 🔄 State management with Pinia
- 📝 Full TypeScript support
- 🖼️ Image gallery for vehicle details

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

## Project Structure

```
vehicle-search/
├── assets/
│   └── styles/           # SCSS stylesheets
│       ├── _variables.scss
│       └── main.scss
├── components/           # Vue components
│   ├── Pagination.vue
│   ├── VehicleCard.vue
│   ├── VehicleDetail.vue
│   ├── VehicleFilters.vue
│   ├── VehicleList.vue
│   └── VehicleStats.vue
├── pages/                # Application pages
│   ├── index.vue
│   └── vehicles/
│       └── [id].vue
├── stores/               # Pinia stores
│   └── vehicle.ts
├── types/                # TypeScript type definitions
│   └── vehicle.ts
├── app.vue               # Root component
├── nuxt.config.ts        # Nuxt configuration
└── tsconfig.json         # TypeScript configuration
```

## Features Overview

### Vehicle List Page

- Grid layout of vehicle cards
- Filter panel with multiple options
- Pagination
- Statistics overview

### Vehicle Detail Page

- Image gallery with thumbnails
- Comprehensive vehicle specifications
- Key features list
- Pricing information
- Monthly payment details

### Filtering Options

- Classification (New/Used)
- Make and Model
- Fuel Type (Petrol, Diesel, Electric, Hybrid)
- Transmission (Manual, Automatic)
- Body Type
- Price Range (Min/Max)
- Year Range (Min/Max)

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

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV NUXT_PUBLIC_API_BASE=http://your-api-url:8080
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

Build and run:

```bash
docker build -t vehicle-search .
docker run -p 3000:3000 -e NUXT_PUBLIC_API_BASE=http://api:8080 vehicle-search
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
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
