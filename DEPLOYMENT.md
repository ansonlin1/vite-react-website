# Wedding Website - Deployment Guide

## 🚀 Complete Steps to Make the Site Live

This guide provides comprehensive instructions for deploying the wedding website to production hosting platforms.

---

## 📋 Pre-Deployment Checklist

### ✅ Development Status Verification

Before deploying, ensure all development requirements are complete:

```bash
# 1. Run complete test suite
npm test -- --run

# 2. Verify production build
npm run build

# 3. Test production preview
npm run preview

# 4. Start API server
npm run api:start

# 5. Run performance audit
npm run perf

# 6. Check accessibility compliance
npm run lighthouse
```

### ✅ Quality Assurance Metrics

Ensure the following benchmarks are met:
- **Unit Tests**: All tests passing (13/13 ✅)
- **Lighthouse Performance**: ≥80% 
- **Lighthouse Accessibility**: ≥95%
- **Lighthouse SEO**: ≥95%
- **Build Status**: Success without errors
- **TypeScript**: No compilation errors
- **ESLint**: No linting violations

---

## 🌐 Deployment Architecture

### Frontend (Static Site)
- **Primary**: Netlify (recommended)
- **Alternatives**: Vercel, AWS S3 + CloudFront, GitHub Pages

### Backend API
- **Primary**: Railway (recommended)
- **Alternatives**: Heroku, DigitalOcean, AWS EC2

### Database
- **Development**: SQLite (file-based)
- **Production**: SQLite (Railway managed) or PostgreSQL

### Domain & DNS
- **Custom Domain**: ansonandpartner.wedding
- **SSL**: Auto-managed by hosting platforms
- **CDN**: Integrated with hosting platforms

---

## 🚀 Phase 1: Repository Preparation

### 1.1 Version Control Setup

```bash
# Ensure all changes are committed
git add .
git commit -m "feat: wedding website ready for deployment"
git push origin main

# Tag release version
git tag -a v1.0.0 -m "Wedding website v1.0.0 - Production ready"
git push origin v1.0.0
```

### 1.2 Environment Configuration

Create production environment file:

```bash
# .env.production
VITE_API_URL=https://your-api-domain.railway.app/api
NODE_ENV=production
```

### 1.3 Build Configuration Verification

Ensure these files are configured correctly:
- `vite.config.ts` - Production optimizations enabled
- `package.json` - All necessary scripts defined
- `tailwind.config.js` - Production purge settings
- `tsconfig.json` - Strict TypeScript settings

---

## 🎯 Phase 2: Frontend Deployment

### Option A: Netlify Deployment (Recommended)

#### 2A.1 Automated Deployment via Git

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Sign up/login with GitHub account
   - Click "New site from Git"
   - Select your repository: `ansonlin1/vite-react-website`

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18.16.0
   ```

3. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-api-domain.railway.app/api`

4. **Deploy**
   - Click "Deploy site"
   - Wait for build completion
   - Site will be live at: `https://your-site-name.netlify.app`

#### 2A.2 Custom Domain Setup

1. **Add Domain**
   - Site Settings → Domain Management
   - Add custom domain: `ansonandpartner.wedding`

2. **Configure DNS Records**
   ```dns
   Type: CNAME
   Name: @
   Value: your-site-name.netlify.app
   TTL: 300
   
   Type: CNAME  
   Name: www
   Value: your-site-name.netlify.app
   TTL: 300
   ```

3. **SSL Certificate**
   - Automatically provisioned by Netlify
   - Force HTTPS enabled

### Option B: Vercel Deployment

#### 2B.1 CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Add environment variables
vercel env add VITE_API_URL production
# Enter: https://your-api-domain.railway.app/api
```

#### 2B.2 Git Integration

1. Connect repository at [vercel.com](https://vercel.com)
2. Import project from GitHub
3. Configure build settings (auto-detected for Vite)
4. Add environment variables
5. Deploy

### Option C: AWS S3 + CloudFront

#### 2C.1 S3 Setup

```bash
# Build project
npm run build

# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://ansonandpartner-wedding

# Upload build files
aws s3 sync dist/ s3://ansonandpartner-wedding --delete

# Configure bucket for static hosting
aws s3 website s3://ansonandpartner-wedding \
  --index-document index.html \
  --error-document index.html
```

#### 2C.2 CloudFront Distribution

```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

---

## ⚙️ Phase 3: Backend API Deployment

### Option A: Railway Deployment (Recommended)

#### 3A.1 Project Setup

1. **Connect to Railway**
   - Go to [Railway](https://railway.app)
   - Connect GitHub account
   - Create new project from repository

2. **Configure Deployment**
   - Select the `api/` directory as root
   - Railway auto-detects Node.js project

3. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=8080
   ```

4. **Custom Start Command**
   ```
   node server.cjs
   ```

#### 3A.2 Database Setup

```bash
# Railway automatically provisions SQLite
# Database file: /app/api/db/database.sqlite
# Auto-backup enabled
```

#### 3A.3 Domain Configuration

1. **Generate Domain**
   - Railway provides: `your-app.railway.app`
   
2. **Custom Domain** (Optional)
   ```
   api.ansonandpartner.wedding → your-app.railway.app
   ```

### Option B: Heroku Deployment

#### 3B.1 Heroku Setup

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create anson-wedding-api

# Configure environment
heroku config:set NODE_ENV=production
heroku config:set NPM_CONFIG_PRODUCTION=false

# Add Procfile
echo "web: node api/server.cjs" > Procfile
```

#### 3B.2 Database Setup

```bash
# For PostgreSQL (if needed)
heroku addons:create heroku-postgresql:hobby-dev

# For SQLite (simpler)
# Database file will be ephemeral - consider PostgreSQL for production
```

#### 3B.3 Deploy

```bash
# Deploy to Heroku
git push heroku main

# Open app
heroku open
```

### Option C: DigitalOcean Droplet

#### 3C.1 Server Setup

```bash
# Create droplet (Ubuntu 22.04)
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/ansonlin1/vite-react-website.git
cd vite-react-website/api
```

#### 3C.2 Application Setup

```bash
# Install dependencies
npm install

# Build if needed
npm run build

# Start with PM2
pm2 start server.cjs --name wedding-api

# Setup startup script
pm2 startup
pm2 save
```

#### 3C.3 Nginx Configuration

```nginx
# /etc/nginx/sites-available/wedding-api
server {
    listen 80;
    server_name api.ansonandpartner.wedding;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔗 Phase 4: Domain & DNS Configuration

### 4.1 Domain Registration

Register domain: `ansonandpartner.wedding`
- **Registrar Options**: Namecheap, GoDaddy, Google Domains, Cloudflare

### 4.2 DNS Configuration

#### 4.2.1 Frontend DNS (Netlify/Vercel)

```dns
# Main domain
Type: CNAME
Name: @
Value: your-netlify-site.netlify.app
TTL: 300

# WWW subdomain
Type: CNAME
Name: www
Value: your-netlify-site.netlify.app
TTL: 300
```

#### 4.2.2 API DNS (Railway/Heroku)

```dns
# API subdomain
Type: CNAME
Name: api
Value: your-railway-app.railway.app
TTL: 300
```

#### 4.2.3 Complete DNS Example

```dns
ansonandpartner.wedding        CNAME  netlify-site.netlify.app
www.ansonandpartner.wedding    CNAME  netlify-site.netlify.app
api.ansonandpartner.wedding    CNAME  railway-app.railway.app
```

### 4.3 SSL Certificate Setup

**Automated (Recommended)**
- Netlify/Vercel: Auto-provisions Let's Encrypt certificates
- Railway/Heroku: Auto-managed SSL

**Manual (If needed)**
```bash
# Using Certbot for custom servers
sudo certbot --nginx -d ansonandpartner.wedding -d www.ansonandpartner.wedding
```

---

## 🔍 Phase 5: Post-Deployment Verification

### 5.1 Functionality Testing

```bash
# Test main site
curl -I https://ansonandpartner.wedding
# Expected: 200 OK with HTTPS

# Test API health
curl https://api.ansonandpartner.wedding/api/health
# Expected: {"status":"OK","timestamp":"..."}

# Test RSVP submission
curl -X POST https://api.ansonandpartner.wedding/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "guests": 2,
    "dietary": "None",
    "message": "Looking forward to it!"
  }'
# Expected: {"id":1,"message":"RSVP submitted successfully"}
```

### 5.2 Performance Verification

```bash
# Lighthouse audit on live site
npx lighthouse https://ansonandpartner.wedding \
  --view \
  --preset=desktop \
  --chrome-flags="--headless"

# Core Web Vitals check
npx @web/test-runner-chrome \
  --playwright \
  --coverage \
  https://ansonandpartner.wedding
```

### 5.3 SEO Validation

1. **Google Search Console**
   - Add property: `ansonandpartner.wedding`
   - Verify ownership via DNS or HTML
   - Submit sitemap: `https://ansonandpartner.wedding/sitemap.xml`

2. **Structured Data Testing**
   ```bash
   # Test structured data
   curl https://search.google.com/test/rich-results \
     -d "url=https://ansonandpartner.wedding"
   ```

3. **Social Media Preview**
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

## 📊 Phase 6: Monitoring & Analytics

### 6.1 Analytics Setup

#### Google Analytics 4

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Core Web Vitals Monitoring

```javascript
// Add to main application
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 6.2 Error Monitoring

#### Sentry Integration

```bash
# Install Sentry
npm install @sentry/react @sentry/tracing

# Configure in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### 6.3 Uptime Monitoring

Set up monitoring with:
- **UptimeRobot** (free tier available)
- **Pingdom** (comprehensive monitoring)
- **StatusCake** (global monitoring)

Monitor these endpoints:
- `https://ansonandpartner.wedding` (frontend)
- `https://api.ansonandpartner.wedding/api/health` (backend)

---

## 🔧 Phase 7: Maintenance & Updates

### 7.1 Regular Maintenance Tasks

#### Weekly
- Monitor performance metrics
- Check error logs
- Review analytics data
- Verify uptime status

#### Monthly
- Update dependencies
  ```bash
  npm update
  npm audit fix
  ```
- Review and rotate logs
- Check SSL certificate expiry
- Performance audit

#### Quarterly
- Comprehensive security review
- Dependency vulnerability scan
- Backup strategy verification
- Performance optimization review

### 7.2 Backup Strategy

#### Database Backups
```bash
# Railway: Automatic daily backups
# Manual backup
cp /app/api/db/database.sqlite backups/wedding-$(date +%Y%m%d).sqlite

# PostgreSQL backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

#### Code Repository
- GitHub repository serves as primary backup
- Consider additional mirrors for critical projects

### 7.3 Emergency Procedures

#### Site Down Response
1. Check hosting platform status pages
2. Verify DNS resolution
3. Check SSL certificate validity
4. Review error logs
5. Rollback to previous version if needed

#### Data Recovery
1. Identify scope of data loss
2. Restore from most recent backup
3. Verify data integrity
4. Test functionality
5. Communicate with stakeholders

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing (13/13)
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Repository pushed to GitHub
- [ ] Performance benchmarks met
- [ ] Accessibility compliance verified

### Frontend Deployment
- [ ] Hosting platform connected
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Site accessible via HTTPS

### Backend Deployment
- [ ] API server deployed
- [ ] Database initialized
- [ ] Environment variables set
- [ ] Health check responding
- [ ] API endpoints functional
- [ ] CORS configured for frontend domain

### DNS & Domain
- [ ] Domain registered
- [ ] DNS records configured
- [ ] SSL certificates issued
- [ ] Domain propagation complete
- [ ] WWW redirect working

### Post-Deployment
- [ ] All functionality tested
- [ ] Performance verified
- [ ] SEO elements validated
- [ ] Analytics configured
- [ ] Error monitoring active
- [ ] Uptime monitoring set up
- [ ] Backup strategy implemented

---

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

#### CORS Errors
```javascript
// Ensure API server allows frontend domain
app.use(cors({
  origin: ['https://ansonandpartner.wedding', 'https://www.ansonandpartner.wedding'],
  credentials: true
}));
```

#### DNS Propagation Issues
```bash
# Check DNS propagation
nslookup ansonandpartner.wedding
# or use online tools: https://dnschecker.org/
```

#### SSL Certificate Issues
- Verify domain ownership
- Check DNS records accuracy
- Contact hosting support if auto-provision fails

### Support Resources

- **Netlify Support**: https://docs.netlify.com/
- **Railway Support**: https://docs.railway.app/
- **Vercel Support**: https://vercel.com/docs
- **DNS Help**: https://dnschecker.org/
- **SSL Check**: https://www.ssllabs.com/ssltest/

---

## 🎉 Success Criteria

### Technical Metrics
- ✅ Site loads in < 3 seconds
- ✅ Lighthouse Performance ≥ 80%
- ✅ Lighthouse Accessibility ≥ 95%
- ✅ Lighthouse SEO ≥ 95%
- ✅ 99.9% uptime
- ✅ All API endpoints functional
- ✅ HTTPS properly configured

### Functional Verification
- ✅ All pages accessible
- ✅ Navigation working correctly
- ✅ RSVP form submissions successful
- ✅ Music request submissions successful
- ✅ Mobile responsiveness verified
- ✅ Cross-browser compatibility confirmed

### Business Objectives
- ✅ Wedding information clearly presented
- ✅ Guest RSVP process streamlined
- ✅ Music requests collected efficiently
- ✅ Professional appearance maintained
- ✅ Accessibility standards met

---

**🎊 Congratulations! Your wedding website is now live and ready to serve your guests!**

---

*For technical support or questions about this deployment guide, refer to the project documentation or contact the development team.*
