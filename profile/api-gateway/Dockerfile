FROM node:16-alpine

WORKDIR /www/profile_api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
