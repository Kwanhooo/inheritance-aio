FROM nginx

MAINTAINER CSU-ZXG

RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir /usr/share/nginx/log/

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/
