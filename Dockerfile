FROM node:16-alpine AS build

WORKDIR /build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/easybill-frontend /usr/share/nginx/html