# Stage 1: Build the application
FROM node:20.9.0-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies based on the package.json file in one layer to leverage Docker cache
COPY package*.json ./

# Install both production and development dependencies for building
RUN npm install --legacy-peer-deps

# Copy only necessary files to reduce build context size
COPY . .

# Build the project and remove development dependencies after the build
RUN npm run build && npm prune --production

# Stage 2: Final image for running the app
FROM node:20.9.0-alpine

# Set working directory in the final stage
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]