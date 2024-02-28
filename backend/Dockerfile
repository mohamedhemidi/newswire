# Use the official PHP image as base
FROM php:8.2.16-fpm-alpine3.19

RUN apk add libzip-dev

RUN docker-php-ext-install pdo pdo_mysql zip


# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 9000
CMD ["php-fpm"]
