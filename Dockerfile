### STAGE 1: Build ###
FROM node:14.19.0 AS build

RUN npm config set registry http://registry.npmjs.org/
#ENV REDIS=redis-master
#ENV REDIS_PORT=6379
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

RUN npm install -g pptx2pdf

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
