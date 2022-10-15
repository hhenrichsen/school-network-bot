FROM node:18-alpine as angular-build
WORKDIR /app
COPY angular/package*.json .
RUN npm install -ci --quiet
COPY ./angular/. .
RUN npm run build --omit=dev

FROM nginx:1.20.1
COPY --from=angular-build /app/dist/app /usr/share/nginx/html/angular
COPY ./proxy/nginx-prod.conf /etc/nginx/nginx.conf
EXPOSE 80