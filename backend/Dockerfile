FROM php:8.2

WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get upgrade && \
    apt-get install -y \
        libicu-dev \
        libzip-dev \
        zip 

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer clear-cache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install pdo pdo_mysql mysqli gettext && docker-php-ext-enable mysqli pdo_mysql

COPY . .

RUN composer install

# Expose port 8000
EXPOSE 8000

# Start Laravel server
CMD php artisan serve --host=0.0.0.0 --port=8000