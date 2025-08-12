#!/bin/bash
# Post-build script to copy static files for production deployment
# This ensures the server can find the built static files in production mode

echo "Copying built static files to server directory..."
cp -r dist/public server/
echo "Post-build setup complete!"