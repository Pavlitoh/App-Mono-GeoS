# Base image
FROM node:20.16.0
# Metadata
LABEL authors="Pavlitoh"

# Create app directory
WORKDIR /app
# Copy package.json and package-lock.json to the app directory
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy the rest of the app source code
COPY . .
# Build the app
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000
# Serve the app
CMD ["npm", "start"]