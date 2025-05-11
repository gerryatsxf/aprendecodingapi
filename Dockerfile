FROM node:18-alpine As development

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy the entire source code
COPY  . .

# Start the server in development mode (adjust command for your framework)
CMD ["npm", "run", "start:dev"]

EXPOSE 3002