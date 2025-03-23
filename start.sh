set -ex
cd /app/build
npm ci --omit="dev"
sed -i '13s|.*|        await import("../start/env.js");|' bin/server.js
node bin/server.js
