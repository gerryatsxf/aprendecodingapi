#!/bin/bash

# Production Deployment Script for AprendeCoding API
# This script deploys the application with fresh MongoDB container

echo "🚀 Starting AprendeCoding API Production Deployment..."

# Load environment variables if .env file exists
if [ -f .env ]; then
    echo "📋 Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "⚠️  No .env file found. Make sure environment variables are set."
fi

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

# Clean up old containers and images
echo "🧹 Cleaning up old containers..."
docker container prune -f
docker image prune -f

# Build the latest images
echo "🔨 Building Docker images..."
docker-compose build api

# Start the services
echo "🌟 Starting MongoDB and API services..."
docker-compose up -d mongodb api

# Wait for services to start
echo "⏳ Waiting for services to initialize..."
sleep 30

# Check service status
echo "📊 Service Status:"
docker-compose ps

# Health check
echo "🏥 Performing health check..."
sleep 10

if curl -f http://localhost:3002 > /dev/null 2>&1; then
    echo "✅ API is healthy and responding!"
    echo "🎉 Deployment completed successfully!"
    echo "📍 API is available at: http://localhost:3002"
    echo "📍 Swagger docs at: http://localhost:3002/swagger"
else
    echo "❌ API health check failed!"
    echo "🔍 Checking logs..."
    docker-compose logs api
    exit 1
fi

# Show running containers
echo "🐳 Running containers:"
docker ps --filter "name=aprendecoding"
