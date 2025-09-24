FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm config set legacy-peer-deps true

RUN npm install

#RUN npm install ajv@latest ajv-keywords@latest

COPY . .

# Build the project with additional logging
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production

# Copy built assets from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html


# Expose the port Nginx will listen on
EXPOSE 8005

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
