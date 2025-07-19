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

# Set environment flag to indicate running in Docker
ENV DOCKER_ENV=true
ENV NODE_ENV=production
ENV PORT=3002

# Run the app without dotenv-cli since we're using environment variables
CMD ["node", "dist/main"]

EXPOSE 3002