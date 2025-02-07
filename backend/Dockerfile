# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables (will be overridden by docker-compose)
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

# Build the application
RUN npm run build

# Stage 2: Create a minimal production image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Ajuste de permissões
RUN chmod -R 755 /app/dist

# Set environment variables (will be overridden by docker-compose)
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]