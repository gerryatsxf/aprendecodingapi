# --- Build Stage ---
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY ./env/dev.env ./env/dev.env

RUN npm run build

# --- Production Stage ---
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/env/dev.env ./env/dev.env

ENV NODE_ENV=production
ENV PORT=3002

# Use dotenv-cli to load env vars and run the app
CMD ["npx", "dotenv", "-e", "./env/dev.env", "--", "node", "dist/main"]

EXPOSE 3002