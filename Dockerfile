# --- Development Stage ---
FROM node:18-alpine AS development

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

# --- Build Stage ---
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3002

CMD ["node", "dist/main.js"]

EXPOSE 3002