#!/bin/bash

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y nginx certbot python3-certbot-nginx

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Create web directory
mkdir -p /var/www/ghana-report
chown -R www-data:www-data /var/www/ghana-report

# Build application
npm ci
npm run build

# Copy built files
cp -r dist/* /var/www/ghana-report/

# Configure Nginx
cp deploy/nginx.conf /etc/nginx/nginx.conf

# Get SSL certificate
certbot --nginx -d ghreportbuzz.com --non-interactive --agree-tos --email info@ghreportbuzz.com

# Secure Nginx logs
chmod 640 /var/log/nginx/*
chown www-data:adm /var/log/nginx/*

# Setup log rotation with IP anonymization
cat > /etc/logrotate.d/nginx << EOF
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    prerotate
        if [ -d /etc/logrotate.d/httpd-prerotate ]; then
            run-parts /etc/logrotate.d/httpd-prerotate
        fi
    endscript
    postrotate
        invoke-rc.d nginx rotate >/dev/null 2>&1
    endscript
}
EOF

# Restart Nginx
systemctl restart nginx
