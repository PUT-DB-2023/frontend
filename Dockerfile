FROM node:18-alpine AS front

WORKDIR /frontend
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /frontend
COPY --from=front /frontend/build .
COPY nginx.conf /etc/nginx/nginx.conf