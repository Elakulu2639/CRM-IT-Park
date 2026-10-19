FROM php:8.3-fpm-alpine

# Install system dependencies, Nginx and Supervisor
RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    linux-headers \
    dos2unix \
    $PHPIZE_DEPS

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_pgsql \
        pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl

# Install Redis extension via PECL
RUN pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /tmp/pear

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

# Ensure bootstrap/cache and storage directories exist and are writable
RUN mkdir -p /var/www/CRM_backend/bootstrap/cache \
             /var/www/CRM_backend/storage/framework/cache/data \
             /var/www/CRM_backend/storage/framework/sessions \
             /var/www/CRM_backend/storage/framework/views \
             /var/www/CRM_backend/storage/logs \
    && chmod -R 777 /var/www/CRM_backend/bootstrap/cache /var/www/CRM_backend/storage

# Finish composer autoload generation safely without triggering runtime scripts during build
RUN composer dump-autoload --optimize --no-dev --no-scripts

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
