# Step 1: Build the application
# Use a Node.js image to build the app
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of your app's source code
COPY . .

# Build the application
RUN pnpm run build

# Step 2: Serve the application
# Use a light-weight node image to serve the built app
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy the build directory from the build stage
COPY --from=build /app/dist /app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app using serve
CMD ["serve", "-s", ".", "-l", "3000"]
