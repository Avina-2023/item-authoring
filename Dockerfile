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

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY 2r7xone702tn4gr
ENV PM2_SECRET_KEY uk0fqq76fb9ahwn

# Bundle app source
COPY . /usr/src/app

EXPOSE 80

# CMD ["node","Server.js"]
CMD ["pm2-runtime", "app.js"]
