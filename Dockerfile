FROM node:23.11.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#RUN npm run build