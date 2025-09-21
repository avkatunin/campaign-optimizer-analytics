FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./

RUN npm config set legacy-peer-deps true

RUN npm install

COPY . .

RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production

# Copy built assts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8005

# In future will be serve our static in Amazon S3 for HA
CMD ["nginx", "-g", "daemon off;"]
