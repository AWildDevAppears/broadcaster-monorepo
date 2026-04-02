FROM node:24-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY . .

RUN npm install -g @microsoft/rush

RUN rm -rf common/temp

RUN rush install --bypass-policy

RUN rush build


