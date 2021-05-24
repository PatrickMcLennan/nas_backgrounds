# nas_backgrounds

## Scrapers make API calls for new 21:9 wallpapers for via CRON, Next.js builds static HTML with them to be served with Express.js

To get started:
  1. `git clone https://www.github.com/patrickmclennan/nas_backgrounds $YOUR_APP`

For local Development, I use Next.js's node server for hot reloading.
  1. `nvm install && nvm use` 
  2. `npm install`
  3. `npm run tsc:build`
  4. `npm run pm2:prod`
