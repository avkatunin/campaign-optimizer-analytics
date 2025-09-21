FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm config set legacy-peer-deps true

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8005

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
