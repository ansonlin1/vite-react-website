# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Set proper ownership and permissions
RUN chown -R node:node /app && \
    chmod -R 755 /app

# Switch to non-root user
USER node

# Install dependencies first
COPY --chown=node:node package*.json ./
RUN npm install --legacy-peer-deps

# Copy configuration files
COPY --chown=node:node tailwind.config.js postcss.config.js ./

# Copy the rest of the application
COPY --chown=node:node . .

# Initialize Tailwind CSS and build
RUN mkdir -p dist && \
    npx tailwindcss init -p && \
    npm run build

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
