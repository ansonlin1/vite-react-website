# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies first and ensure global bin directory is accessible
COPY package*.json ./
RUN mkdir -p /app/node_modules/.bin && \
    npm install --legacy-peer-deps && \
    chmod +x /app/node_modules/.bin/vite && \
    npm install -g vite

# Copy the rest of the application
COPY . .

# Build the application using npx
RUN npx vite build

# Set permissions for the build output
RUN mkdir -p dist && chown -R node:node /app/dist

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Add nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
