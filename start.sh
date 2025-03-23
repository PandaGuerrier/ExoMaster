set -ex
cd /app/build
npm ci --omit="dev"
node bin/server.js
