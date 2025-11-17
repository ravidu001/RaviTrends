# Frontend Dockerfile - Multi-stage build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (with legacy peer deps to avoid conflicts)
RUN npm install --legacy-peer-deps

# Copy application files
COPY . .

# Set build environment variables
ENV NODE_ENV=production
ENV CI=false

# Build the application (increase Node memory limit and disable linting)
RUN NODE_OPTIONS=--max-old-space-size=2048 npm run build || \
    (echo "Build failed, trying without linting..." && \
     npm run build --no-lint)

# Production stage with Nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
