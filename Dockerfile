FROM node:16-alpine AS build
WORKDIR /build
RUN ls -l
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.23-alpine
COPY --from=build /build/dist/easybill-frontend /usr/share/nginx/html