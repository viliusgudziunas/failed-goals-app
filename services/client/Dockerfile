# base image
FROM node:13.1.0-alpine

# working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# setup path
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependancies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci
RUN npm install react-scripts@3.2.0 -g --silent

# start app
CMD ["npm", "start"]