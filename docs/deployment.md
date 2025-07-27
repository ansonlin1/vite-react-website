# Deployment Guide

This guide covers deploying the wedding website to various hosting platforms.

## Prerequisites

- Completed project build (`npm run build`)
- Environment variables configured
- Database setup (for production)

## Frontend Deployment

### Netlify (Recommended for Static Sites)

1. **Connect Repository**

   ```bash
   # Push to GitHub/GitLab
   git add .
   git commit -m "feat: wedding website complete"
   git push origin main
   ```

2. **Netlify Configuration**

   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18.16.0`

3. **Environment Variables**

   ```env
   VITE_API_URL=https://your-api-domain.com/api
   ```

4. **Custom Domain**
   - Add custom domain: `ansonandpartner.wedding`
   - Configure DNS records
   - Enable HTTPS

### Vercel (Zero Config)

1. **Deploy via CLI**

   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Environment Variables**
   ```bash
   vercel env add VITE_API_URL production
   ```

### AWS S3 + CloudFront

1. **Build and Upload**

   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name
   ```

2. **CloudFront Configuration**
   - Origin: S3 bucket
   - Custom error pages for SPA routing
   - SSL certificate

## Backend Deployment

### Railway (Recommended)

1. **Connect Repository**

   ```bash
   # Add railway.json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "node api/server.js",
       "healthcheckPath": "/api/health"
     }
   }
   ```

2. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=8080
   DATABASE_URL=railway_postgres_url
   ```

### Heroku

1. **Heroku Setup**

   ```bash
   heroku create your-wedding-api
   heroku config:set NODE_ENV=production
   heroku config:set DATABASE_URL=your_db_url
   ```

2. **Procfile**

   ```
   web: node api/server.js
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### DigitalOcean Droplet

1. **Server Setup**

   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2
   ```

2. **Application Deployment**

   ```bash
   # Upload code
   scp -r . user@your-server:/var/www/wedding-api

   # Start with PM2
   pm2 start api/server.js --name wedding-api
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**

   ```nginx
   server {
       listen 80;
       server_name api.ansonandpartner.wedding;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Setup

### SQLite (Development/Small Scale)

```bash
# Already configured in the project
npm run db:migrate
```

### PostgreSQL (Production)

1. **Create Database**

   ```sql
   CREATE DATABASE wedding_db;
   CREATE USER wedding_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE wedding_db TO wedding_user;
   ```

2. **Update Schema**

   ```sql
   -- RSVP table
   CREATE TABLE rsvps (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(50),
       guests INTEGER DEFAULT 1,
       dietary TEXT,
       message TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Music requests table
   CREATE TABLE music_requests (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       song_title VARCHAR(255) NOT NULL,
       artist VARCHAR(255) NOT NULL,
       message TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Connection String**
   ```env
   DATABASE_URL=postgresql://wedding_user:password@localhost:5432/wedding_db
   ```

## DNS Configuration

### Domain Setup

```dns
# A Records
@ → Your_Server_IP
www → Your_Server_IP
api → Your_API_Server_IP

# CNAME Records
ansonandpartner.wedding → netlify_domain.netlify.app
```

### SSL Certificate

```bash
# Let's Encrypt with Certbot
sudo certbot --nginx -d ansonandpartner.wedding -d www.ansonandpartner.wedding
```

## Performance Optimization

### CDN Configuration

```javascript
// vite.config.ts for production
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === "html") {
        return `https://cdn.ansonandpartner.wedding/${filename}`;
      }
    },
  },
});
```

### Caching Headers

```nginx
# Static assets caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML files
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

## Monitoring & Analytics

### Error Tracking

```typescript
// Add to main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Analytics

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Uptime Monitoring

```bash
# Use services like:
# - Pingdom
# - UptimeRobot
# - StatusCake
```

## Backup Strategy

### Database Backups

```bash
# PostgreSQL backup
pg_dump wedding_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backups with cron
0 2 * * * pg_dump wedding_db > /backups/wedding_$(date +\%Y\%m\%d).sql
```

### File Backups

```bash
# Rsync for file backups
rsync -avz /var/www/wedding-api/ backup-server:/backups/wedding-api/
```

## Security Considerations

### Environment Variables

```bash
# Never commit sensitive data
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### API Security

```javascript
// Rate limiting
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

### HTTPS Enforcement

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name ansonandpartner.wedding www.ansonandpartner.wedding;
    return 301 https://$server_name$request_uri;
}
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Wedding Website

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm test
      - run: npm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: "./dist"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Troubleshooting

### Common Issues

1. **Build Fails**

   ```bash
   # Clear cache and reinstall
   npm run clean
   npm install
   npm run build
   ```

2. **API Connection Issues**

   ```bash
   # Check environment variables
   echo $VITE_API_URL

   # Test API endpoint
   curl https://your-api-domain.com/api/health
   ```

3. **Database Connection**
   ```bash
   # Test database connection
   psql $DATABASE_URL -c "SELECT 1;"
   ```

### Performance Issues

```bash
# Analyze bundle size
npm run bundle-analyze

# Run performance audit
npm run perf

# Check Lighthouse scores
npm run lighthouse
```

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend API deployed and responsive
- [ ] Database migrated and accessible
- [ ] SSL certificates configured
- [ ] DNS records pointing correctly
- [ ] Environment variables set
- [ ] Error tracking configured
- [ ] Analytics tracking working
- [ ] Performance metrics acceptable
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured

## Maintenance

### Regular Tasks

- Monitor performance metrics
- Check error logs weekly
- Update dependencies monthly
- Review security advisories
- Backup database regularly
- Monitor uptime and response times

### Updates

```bash
# Update dependencies
npm update
npm audit fix

# Test after updates
npm test
npm run test:e2e
npm run build
```
