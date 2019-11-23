# base image
FROM nginx:1.17.6-alpine

# setup nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY /dev.conf /etc/nginx/conf.d