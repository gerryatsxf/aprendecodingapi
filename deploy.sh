#!/bin/bash

# Production Deployment Script for AprendeCoding API
# This script deploys the application with fresh MongoDB container using plain Docker commands

echo "🚀 Starting AprendeCoding API Production Deployment..."

# Stop and remove existing containers
echo "� Stopping existing containers..."
docker stop aprendecoding_api aprendecoding_mongodb || true
docker rm aprendecoding_api aprendecoding_mongodb || true

# Remove existing network
docker network rm aprendecoding_network || true

# Clean up old containers and images
echo "🧹 Cleaning up old containers..."
docker container prune -f
docker image prune -f

# Create network
echo "🌐 Creating Docker network..."
docker network create aprendecoding_network

# Build the latest image
echo "🔨 Building Docker image..."
docker build . --file Dockerfile --tag aprendecoding:latest

# Start MongoDB
echo "� Starting MongoDB container..."
docker run -d --name aprendecoding_mongodb \
  --network aprendecoding_network \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin_root \
  -e MONGO_INITDB_ROOT_PASSWORD=admin_root \
  -e MONGO_INITDB_DATABASE=aprendecoding \
  mongo:7.0

# Wait for MongoDB to start
echo "⏳ Waiting for MongoDB to initialize..."
sleep 15

# Start the API
echo "🌟 Starting API container..."
docker run -d --name aprendecoding_api \
  --network aprendecoding_network \
  -p 3002:3002 \
  -e DOCKER_ENV=true \
  -e NODE_ENV=production \
  -e PORT=3002 \
  -e MONGO_DB_ATLAS_CONNECTION_STRING="mongodb://admin_root:admin_root@aprendecoding_mongodb:27017/aprendecoding?authSource=admin" \
  -e JWT_SECRET="asdfasdfk,jblkbjkjbk" \
  -e JWT_EXPIRES_IN="100000000000000" \
  -e STRIPE_SECRET_KEY="whsec_0vOj04dycQXk5fcym0J1u8DzzT43RJe5" \
  -e STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET_KEY="whsec_0vOj04dycQXk5fcym0J1u8DzzT43RJe5" \
  -e NYLAS_MAIN_ACCOUNT_EMAIL="aprendecoding.asesorias@gmail.com" \
  -e NYLAS_CLIENT_ID="4593p1su07f0lnpgz9ed8j876" \
  -e NYLAS_CLIENT_SECRET="4wllscweoc2hdv7bdbx9kgv68" \
  -e NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN="RKveXZHcdBwUX33t73xtkZOlXqLvVK" \
  -e CREATE_MEETING_URL="https://hook.us2.make.com/hzi0l51s454ubp573crjvdrsovnpv5xc" \
  -e VONAGE_JWT_365_DAYS="hey" \
  aprendecoding:latest

# Wait for services to start
echo "⏳ Waiting for API to initialize..."
sleep 30

# Check service status
echo "📊 Service Status:"
docker ps --filter "name=aprendecoding"

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:3002 > /dev/null 2>&1; then
    echo "✅ API is healthy and responding!"
    echo "🎉 Deployment completed successfully!"
    echo "📍 API is available at: http://localhost:3002"
    echo "📍 Swagger docs at: http://localhost:3002/swagger"
else
    echo "❌ API health check failed!"
    echo "🔍 Checking logs..."
    echo "=== API Logs ==="
    docker logs aprendecoding_api --tail 50
    echo "=== MongoDB Logs ==="
    docker logs aprendecoding_mongodb --tail 20
    exit 1
fi

# Show running containers
echo "🐳 All containers are running:"
docker ps --filter "name=aprendecoding"
