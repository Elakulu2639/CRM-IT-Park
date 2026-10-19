FROM php:8.3-fpm-alpine

# Install Nginx, Supervisor, and basic tools
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    git \
    unzip \
    dos2unix

# Install PHP extensions cleanly and reliably via official installer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    redis

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/CRM_backend

# Add non-root user
RUN addgroup -g 1000 -S www && \
    adduser -u 1000 -S www -G www

# Copy composer files first for better layer caching
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

# Copy the rest of the application code
COPY . .

# Finish composer autoload generation
RUN composer dump-autoload --optimize --no-dev

# Copy server configurations
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh

# Convert line endings and make entrypoint executable
RUN dos2unix /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh

# Fix ownership and permissions
RUN chown -R www:www /var/www/CRM_backend \
    && chmod -R 775 /var/www/CRM_backend/storage /var/www/CRM_backend/bootstrap/cache

EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
