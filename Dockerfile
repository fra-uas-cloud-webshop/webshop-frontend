# Stage 1: Build React App
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve React App with Node.js
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy the built React files
COPY --from=build /app/build /app/build

# Expose the port (default for serve is 3000)
EXPOSE 3000

# Run the server
CMD ["serve", "-n", "-s", "build", "-l", "3000"]