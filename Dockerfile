FROM php:7.2-apache

RUN set -ex; apt-get update; apt-get install -y curl mysql-client
RUN rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install mysqli pdo_mysql 

