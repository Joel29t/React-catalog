FROM php:7.4-apache

COPY ./src /var/www/html

RUN docker-php-ext-install mysqli

RUN docker-php-ext-install pdo_mysql

RUN cp /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled/headers.load

EXPOSE 80

# RUN a2enmod headers
# COPY create_user.sql  /docker-entrypoint-initdb.d/