FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
COPY --from=builder /app/dist dist
CMD [ "node", "dist/main.js" ]