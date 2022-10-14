FROM node:18-alpine
RUN npm install -g @angular/cli @angular-devkit/build-angular
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD npm start