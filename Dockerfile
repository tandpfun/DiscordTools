# Build stage
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

# Copy built application and necessary files from builder stage
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/nuxt.config.js ./
COPY --from=builder /app/static ./static
COPY --from=builder /app/api ./api
COPY --from=builder /app/package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
