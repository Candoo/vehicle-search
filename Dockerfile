# Production Dockerfile for Nuxt.js frontend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Accept build argument for API base URL (required for build-time configuration)
ARG NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "run", "preview"]