FROM node:0.12.7-wheezy

MAINTAINER YuanKang "https://github.com/dutyk"

RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.7.12-1~wheezy

RUN apt-get update && \
    apt-get install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

WORKDIR /app

COPY . /app/

RUN cp -R /app/dist/*  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
