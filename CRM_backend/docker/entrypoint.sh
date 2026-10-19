#!/bin/sh
set -e

PORT="${PORT:-10000}"
echo "Configuring Nginx port to ${PORT}..."
sed -i "s/listen 10000/listen ${PORT}/g" /etc/nginx/http.d/default.conf

# Ensure writable permissions for Laravel storage and cache
mkdir -p /var/www/CRM_backend/storage/framework/cache/data \
         /var/www/CRM_backend/storage/framework/sessions \
         /var/www/CRM_backend/storage/framework/views \
         /var/www/CRM_backend/storage/logs \
         /var/www/CRM_backend/bootstrap/cache

chown -R www:www /var/www/CRM_backend/storage /var/www/CRM_backend/bootstrap/cache
chmod -R 775 /var/www/CRM_backend/storage /var/www/CRM_backend/bootstrap/cache

# Run database migrations
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    echo "Running database migrations..."
    php artisan migrate --force || echo "Migration command failed, skipping..."
fi

# Run database seeders if explicitly requested
if [ "${RUN_SEEDERS:-false}" = "true" ]; then
    echo "Running database seeders..."
    php artisan db:seed --force || echo "Seed command failed, skipping..."
fi

# Cache configuration, routes, and views for production performance
echo "Caching Laravel configuration and routes..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "Starting Nginx and PHP-FPM via Supervisor on port ${PORT}..."
exec /usr/bin/supervisord -c /etc/supervisord.conf
