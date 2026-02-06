#!/bin/bash

# Script to prepare config files for production deployment
# This removes local_backend from the CMS config files

echo "Preparing for production deployment..."

# Update admin config
if [ -f "public/admin/config.yml" ]; then
  # Comment out local_backend if it exists
  sed -i.bak 's/^local_backend: true/# local_backend: true/' public/admin/config.yml
  echo "✓ Updated public/admin/config.yml"
fi

# Update root config
if [ -f "public/config.yml" ]; then
  # Comment out local_backend if it exists
  sed -i.bak 's/^local_backend: true/# local_backend: true/' public/config.yml
  echo "✓ Updated public/config.yml"
fi

echo ""
echo "Production config ready!"
echo "Remember to:"
echo "1. Update astro.config.mjs with your site URL"
echo "2. Commit and push to GitHub"
echo "3. Setup Netlify Identity (see DEPLOYMENT.md)"
