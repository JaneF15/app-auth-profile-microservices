FROM node:16-alpine

WORKDIR /www/auth_api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
