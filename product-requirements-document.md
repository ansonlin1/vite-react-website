# Product Requirements Document (PRD)

## Project: Modern React Wedding Website

---

## 1. Purpose

This document outlines the requirements for a modern, accessible, and responsive wedding website built using React, TypeScript, Vite, and Tailwind CSS. The website will provide information about the wedding, allow guests to RSVP, and let guests request music for the event. All RSVP and music requests will be stored in a database, and requested songs will be automatically added to a playlist.

---

## 2. Stakeholders

- **Product Owners:** Anson Lin
- **Development Team:** Frontend Developers, Backend Developers, UI/UX Designers
- **End Users:** Wedding guests

---

## 3. Goals & Objectives

- Deliver a beautiful, performant, and accessible wedding website
- Provide all essential wedding information (date, venue, schedule, registry, etc.)
- Allow guests to RSVP via a form, storing responses in a secure database
- Allow guests to request music, automatically adding requests to a playlist
- Ensure compliance with WCAG 2.1 AA accessibility standards
- Support responsive design for all devices

---

## 4. Features

### 4.1 Core Pages

- **Homepage:**

  - Hero section with couple’s names, wedding date, and location
  - Countdown to the event
  - Brief welcome message
  - Navigation to other sections

- **Event Details:**

  - Schedule of events
  - Venue information with map and directions
  - Dress code and other important notes

- **RSVP Page:**

  - RSVP form (see 4.2)
  - Confirmation message after submission

- **Registry Page:**

  - Links to gift registries

- **Music Requests Page:**

  - Form for guests to request songs
  - List of requested songs (optional, can be private or public)

- **Header:**

  - Logo or couple’s monogram
  - Navigation menu (keyboard accessible, ARIA roles)
  - Responsive hamburger menu for mobile

- **Footer:**
  - Copyright
  - Social media links
  - Contact information

### 4.2 RSVP Form

- Fields:
  - Name (required, text)
  - Email (required, email)
  - Number of guests (required, number, min 1)
  - Meal preference (dropdown, optional)
  - Song request (optional, text input or autocomplete)
  - Accessibility needs (optional, textarea)
- Accessibility:
  - All fields have labels and ARIA attributes
  - Proper error handling and validation
- Submission:
  - Data is stored in a secure database
  - Song requests are automatically added to a playlist (see 4.3)
  - Confirmation message shown after successful submission

### 4.3 Music Playlist Integration

- When a guest submits a song request via RSVP or the music request form:
  - The song is validated (e.g., check for duplicates, profanity filter)
  - The song is added to a playlist in the database
  - Optionally, integrate with a music API (e.g., Spotify, YouTube) to build a real playlist

### 4.4 Accessibility

- Semantic HTML5 structure
- All interactive elements are keyboard accessible
- Sufficient color contrast and focus indicators
- Images use `alt` attributes and/or `aria-label`
- ARIA roles and attributes where appropriate

### 4.5 Performance

- Fast initial load (Lighthouse score 90+)
- Lazy loading of images and non-critical assets
- Responsive images
- Code splitting and dynamic imports for large components

### 4.6 SEO

- Proper `<title>` and `<meta>` tags
- Open Graph and Twitter Card metadata
- Sitemap and robots.txt

### 4.7 Styling & Theming

- Use [Tailwind CSS](https://tailwindcss.com/) for all styling and layout.
- Apply a modern, elegant, and romantic color palette suitable for weddings (e.g., blush, ivory, gold, navy, sage, etc.).
- Use responsive design principles to ensure the site looks great on all devices (mobile, tablet, desktop).
- Typography should use modern, readable, and elegant fonts (e.g., serif for headings, sans-serif for body).
- Support dark mode using `prefers-color-scheme` and Tailwind's dark mode utilities.
- Use CSS Grid and Flexbox for layouts.
- Apply smooth transitions and subtle animations for interactive elements (e.g., buttons, menus).
- Ensure all color choices meet WCAG 2.1 AA contrast requirements.
- Use semantic HTML5 elements for structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, etc.).
- Optimize images (WebP/AVIF), use `loading="lazy"`, and provide `alt` text for all images.
- Add logical spacing and visual hierarchy for clarity and elegance.
- All form fields must have clear labels, focus indicators, and error states.
- Use ARIA roles and attributes where appropriate for accessibility.
- Ensure consistent theming across all pages and components.

---

## 5. Technical Requirements

### 5.1 Development Stack

- **Frontend:** React 18+ (with TypeScript), Vite, Tailwind CSS
- **Backend:** Node.js 18+ with Express.js
- **Database:** SQLite 3.46+ (development), SQLite/PostgreSQL (production)
- **Testing:** Vitest + React Testing Library (unit), Playwright (E2E)
- **Linting:** ESLint with TypeScript and React plugins
- **Version Control:** Git (GitHub)
- **Documentation:** Markdown files in `/docs`

### 5.2 Production Hosting Requirements

#### 5.2.1 Frontend Hosting
- **Primary Platform:** Netlify (recommended)
- **Alternative Platforms:** Vercel, AWS S3 + CloudFront, GitHub Pages
- **Requirements:**
  - Static site hosting with CDN
  - Automatic SSL certificate provisioning
  - Custom domain support (`ansonandpartner.wedding`)
  - Environment variable support
  - Git-based deployment pipeline
  - Build command: `npm run build`
  - Publish directory: `dist`

#### 5.2.2 Backend API Hosting
- **Primary Platform:** Railway (recommended)
- **Alternative Platforms:** Heroku, DigitalOcean, AWS EC2
- **Requirements:**
  - Node.js 18+ runtime support
  - Persistent file storage for SQLite database
  - Environment variable configuration
  - HTTPS/SSL support
  - CORS configuration for frontend domain
  - Health check endpoint
  - Automatic deployments from Git

#### 5.2.3 Domain & DNS
- **Custom Domain:** `ansonandpartner.wedding`
- **Subdomain Structure:**
  - Main site: `ansonandpartner.wedding` / `www.ansonandpartner.wedding`
  - API: `api.ansonandpartner.wedding` (optional)
- **SSL Requirements:** 
  - HTTPS enforced on all endpoints
  - Valid SSL certificates (Let's Encrypt acceptable)
  - HSTS headers enabled

### 5.3 Performance Requirements

- **Lighthouse Scores:**
  - Performance: ≥ 80%
  - Accessibility: ≥ 95%
  - Best Practices: ≥ 90%
  - SEO: ≥ 95%
- **Core Web Vitals:**
  - First Contentful Paint (FCP): < 2.5s
  - Largest Contentful Paint (LCP): < 2.5s
  - Cumulative Layout Shift (CLS): < 0.1
  - First Input Delay (FID): < 100ms
- **API Response Times:** < 500ms average

### 5.4 Monitoring & Analytics

- **Uptime Monitoring:** 99.9% availability target
- **Error Tracking:** Sentry or similar service integration
- **Analytics:** Google Analytics 4 integration
- **Performance Monitoring:** Core Web Vitals tracking
- **API Monitoring:** Health check endpoints with alerting

### 5.5 Security Requirements

- **HTTPS Enforcement:** All traffic redirected to HTTPS
- **Content Security Policy (CSP):** Configured and enforced
- **Input Sanitization:** All user inputs validated and sanitized
- **Database Security:** Parameterized queries, no SQL injection vectors
- **CORS Configuration:** Restricted to production domains only
- **Environment Variables:** Sensitive data stored securely
- **Regular Updates:** Dependencies updated monthly minimum

### 5.6 Backup & Recovery

- **Database Backups:** 
  - Automated daily backups
  - 30-day retention minimum
  - Point-in-time recovery capability
- **Code Repository:** 
  - GitHub serves as primary backup
  - Tagged releases for version control
- **Deployment Rollback:** 
  - Ability to rollback to previous version within 5 minutes
  - Blue-green deployment strategy preferred

### 5.7 Folder Structure

- `src/components/` for reusable UI components
- `src/pages/` for route-level components
- `src/test/` for unit and integration tests
- `api/` for backend API handlers and server
- `e2e/` for end-to-end test specifications
- `data/` for SQLite database files
- `public/` for static assets and favicons
- `docs/` for comprehensive documentation
- `DEPLOYMENT.md` for complete deployment guide

---

## 6. Non-Functional Requirements

### 6.1 Accessibility
- **Standard:** WCAG 2.1 AA minimum compliance
- **Testing:** Automated testing with axe-core, manual testing required
- **Focus Management:** Keyboard navigation support for all interactive elements
- **Screen Reader Support:** Semantic HTML and ARIA attributes
- **Color Contrast:** 4.5:1 minimum ratio for normal text, 3:1 for large text

### 6.2 Browser Compatibility
- **Supported Browsers:** Latest two versions of Chrome, Firefox, Edge, Safari
- **Mobile Browsers:** iOS Safari, Android Chrome
- **Progressive Enhancement:** Core functionality available without JavaScript
- **Polyfills:** Minimal polyfills for essential features only

### 6.3 Responsiveness
- **Design Approach:** Mobile-first responsive design
- **Breakpoints:** Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Touch Support:** Touch-friendly UI elements (44px minimum target size)
- **Orientation:** Support for both portrait and landscape orientations

### 6.4 Security
- **Data Protection:** 
  - Sanitize all user inputs to prevent XSS attacks
  - Parameterize database queries to prevent SQL injection
  - Validate and sanitize file uploads if implemented
- **Transport Security:** 
  - Enforce HTTPS for all connections
  - Implement HTTP Strict Transport Security (HSTS)
  - Secure cookie settings (`HttpOnly`, `Secure`, `SameSite`)
- **API Security:**
  - Rate limiting on form submissions
  - Input validation on all endpoints
  - CORS properly configured for production domains

### 6.5 Performance Standards
- **Loading Performance:**
  - Initial page load: < 3 seconds on 3G connection
  - Time to Interactive (TTI): < 5 seconds
  - Bundle size: < 500KB gzipped JavaScript
- **Runtime Performance:**
  - 60 FPS animations and interactions
  - Memory usage: < 50MB for main bundle
  - API response times: < 500ms average
- **Optimization Requirements:**
  - Image lazy loading and optimization (WebP/AVIF)
  - Code splitting for non-critical features
  - Critical CSS inlined
  - Preload key resources

### 6.6 Deployment & DevOps
- **Continuous Integration:**
  - Automated testing on pull requests
  - Build verification before deployment
  - Linting and type checking in CI pipeline
- **Deployment Strategy:**
  - Zero-downtime deployments
  - Rollback capability within 5 minutes
  - Environment parity (dev/staging/production)
- **Monitoring Requirements:**
  - Real-time error tracking and alerting
  - Performance monitoring with Core Web Vitals
  - Uptime monitoring with 99.9% SLA target
  - Analytics tracking for user engagement

---

## 7. Out of Scope

- Payment processing
- User authentication (unless required for admin access)
- Advanced music playlist management (beyond basic add/list)

---

## 8. Success Metrics

### 8.1 Technical Performance
- **Lighthouse Audit Scores:**
  - Performance: ≥ 80% (target: 90%+)
  - Accessibility: ≥ 95% (target: 100%)
  - Best Practices: ≥ 90% (target: 95%+)
  - SEO: ≥ 95% (target: 100%)
- **Core Web Vitals:**
  - First Contentful Paint (FCP): < 2.5 seconds
  - Largest Contentful Paint (LCP): < 2.5 seconds
  - Cumulative Layout Shift (CLS): < 0.1
  - First Input Delay (FID): < 100ms
- **Build & Test Results:**
  - Zero TypeScript compilation errors
  - All unit tests passing (100% success rate)
  - All E2E tests passing (100% success rate)
  - ESLint passes with zero violations

### 8.2 Accessibility Compliance
- **Automated Testing:**
  - No critical accessibility issues detected by axe-core
  - WAVE tool shows zero errors
  - Lighthouse accessibility audit ≥ 95%
- **Manual Testing:**
  - Full keyboard navigation functionality
  - Screen reader compatibility verified
  - Color contrast compliance (WCAG 2.1 AA)
  - Focus indicators visible and logical

### 8.3 Browser Compatibility
- **Cross-Browser Testing:**
  - Zero critical issues across supported browsers
  - Consistent visual rendering within 5% variance
  - All interactive features functional
  - Performance metrics within acceptable ranges

### 8.4 Functional Requirements
- **Core Features:**
  - RSVP submissions successfully stored in database
  - Music requests reliably captured and stored
  - All form validations working correctly
  - Email notifications functional (if implemented)
- **Data Integrity:**
  - Database operations complete without corruption
  - Form submissions have 100% success rate under normal load
  - Data retrieval operations perform consistently

### 8.5 Production Readiness
- **Deployment Success:**
  - Automated deployment pipeline functional
  - Zero-downtime deployment achieved
  - Environment variables properly configured
  - SSL certificates active and valid
- **Monitoring & Alerting:**
  - Uptime monitoring active with 99.9% target
  - Error tracking configured and responsive
  - Performance monitoring baseline established
  - Analytics tracking functional

### 8.6 User Experience
- **Usability Metrics:**
  - Average task completion time < 2 minutes for RSVP
  - Form abandonment rate < 10%
  - Mobile usability score ≥ 95%
  - Page load satisfaction (user perception testing)
- **Content Quality:**
  - All wedding information clearly presented
  - Navigation intuitive and accessible
  - Visual design consistent with wedding theme
  - Professional appearance maintained across devices

---

## 9. Milestones

### Phase 1: Foundation & Setup ✅
1. **Project Scaffolding** (Complete)
   - Vite + React + TypeScript setup
   - Tailwind CSS configuration
   - ESLint and development tooling
   - Git repository initialization

2. **Core Infrastructure** (Complete)
   - Component architecture established
   - Routing setup with React Router
   - Basic layout components (Header, Footer, Layout)
   - Responsive design foundation

### Phase 2: Core Features ✅
3. **Homepage Implementation** (Complete)
   - Hero section with wedding details
   - Countdown timer functionality
   - Welcome message and navigation
   - Mobile-responsive design

4. **Essential Pages** (Complete)
   - Event Details page with venue information
   - Registry page with external links
   - Basic navigation between pages
   - Consistent styling and theming

### Phase 3: Interactive Features ✅
5. **RSVP System** (Complete)
   - RSVP form with comprehensive validation
   - Backend API integration
   - Database storage implementation
   - Confirmation messaging

6. **Music Request Feature** (Complete)
   - Music request form and validation
   - Integration with RSVP or standalone functionality
   - Database storage for playlist management
   - User feedback on submissions

### Phase 4: Technical Excellence ✅
7. **SEO & Accessibility** (Complete)
   - Meta tags, Open Graph, Twitter Cards
   - Semantic HTML structure
   - ARIA attributes and keyboard navigation
   - WCAG 2.1 AA compliance verification

8. **Performance Optimization** (Complete)
   - Image optimization and lazy loading
   - Code splitting implementation
   - Bundle size optimization
   - Core Web Vitals optimization

### Phase 5: Quality Assurance ✅
9. **Testing Implementation** (Complete)
   - Unit testing with Vitest + React Testing Library
   - End-to-end testing with Playwright
   - Accessibility testing automation
   - Cross-browser compatibility testing

10. **Documentation & Code Review** (Complete)
    - Comprehensive documentation suite
    - Code quality standards enforcement
    - Performance documentation
    - Testing and deployment guides

### Phase 6: Production Deployment 🚀
11. **Deployment Preparation** (Ready)
    - Environment configuration for production
    - Build optimization and verification
    - Security review and hardening
    - Backup and recovery procedures

12. **Go-Live Process** (Pending Approval)
    - Frontend deployment to hosting platform
    - Backend API deployment and configuration
    - Domain and SSL certificate setup
    - Post-deployment verification and monitoring

### Phase 7: Post-Launch Support
13. **Monitoring & Maintenance** (Planned)
    - Analytics and performance monitoring setup
    - Error tracking and alerting configuration
    - Regular maintenance and update procedures
    - User feedback collection and iteration

**Current Status:** Phase 6 complete - All development work finished, deployment guide created, ready for production launch pending explicit approval.

---

## 10. Risks & Mitigations

### 10.1 Technical Risks

#### Risk: Spam or inappropriate song/RSVP requests
- **Impact:** High - Could compromise user experience and data quality
- **Mitigation:** 
  - Input validation and sanitization on all forms
  - Rate limiting on form submissions (1 per minute per IP)
  - Profanity filter for song requests and messages
  - Admin review queue for inappropriate content
  - CAPTCHA implementation if spam becomes problematic

#### Risk: Database corruption or data loss
- **Impact:** Critical - Loss of RSVP and music request data
- **Mitigation:**
  - Automated daily database backups with 30-day retention
  - Point-in-time recovery capability
  - Database integrity checks in CI/CD pipeline
  - Redundant storage across multiple geographic locations
  - Regular backup restore testing

#### Risk: Website downtime during wedding period
- **Impact:** High - Guests unable to access information or RSVP
- **Mitigation:**
  - 99.9% uptime SLA with hosting provider
  - Multiple hosting platform options (primary + backup)
  - CDN distribution for improved reliability
  - Real-time uptime monitoring with instant alerts
  - Emergency contact procedures for rapid issue resolution

#### Risk: Performance degradation under high load
- **Impact:** Medium - Poor user experience during peak traffic
- **Mitigation:**
  - Load testing before launch with simulated traffic
  - Auto-scaling infrastructure configuration
  - Performance monitoring with alerting thresholds
  - Code splitting and lazy loading implementation
  - CDN caching for static assets

### 10.2 Security Risks

#### Risk: Cross-site scripting (XSS) attacks
- **Impact:** High - Potential data theft or site defacement
- **Mitigation:**
  - Content Security Policy (CSP) implementation
  - Input sanitization on all user-generated content
  - Regular security audit and penetration testing
  - Automated security scanning in CI/CD pipeline

#### Risk: SQL injection attacks
- **Impact:** Critical - Database compromise and data breach
- **Mitigation:**
  - Parameterized database queries exclusively
  - Input validation and type checking
  - Least-privilege database access
  - Regular security updates and patches

#### Risk: SSL certificate expiration
- **Impact:** Medium - Site accessibility and trust issues
- **Mitigation:**
  - Automated certificate renewal (Let's Encrypt)
  - Certificate monitoring with 30-day expiration alerts
  - Backup manual renewal procedures
  - Documentation of renewal process

### 10.3 Business Risks

#### Risk: Scope creep and feature expansion
- **Impact:** Medium - Delayed timeline and increased complexity
- **Mitigation:**
  - Strict adherence to this PRD
  - Change request approval process
  - Clear definition of MVP vs. nice-to-have features
  - Regular stakeholder communication and expectation management

#### Risk: Last-minute design or content changes
- **Impact:** Medium - Deployment delays and quality issues
- **Mitigation:**
  - Content freeze date established (2 weeks before launch)
  - Staged deployment process for urgent changes
  - Version control and rollback capabilities
  - Clear approval workflow for changes

#### Risk: Third-party service dependencies
- **Impact:** Medium - Service outages affecting functionality
- **Mitigation:**
  - Minimal external dependencies
  - Fallback options for critical services
  - Service status monitoring and alerts
  - Graceful degradation for non-essential features

### 10.4 User Experience Risks

#### Risk: Accessibility compliance gaps
- **Impact:** High - Legal liability and excluded user groups
- **Mitigation:**
  - Automated accessibility testing in CI/CD
  - Manual testing with screen readers
  - Regular accessibility audits
  - WCAG 2.1 AA compliance verification
  - User feedback channels for accessibility issues

#### Risk: Mobile usability problems
- **Impact:** High - Poor experience for majority of users
- **Mitigation:**
  - Mobile-first design approach
  - Comprehensive device testing
  - Performance optimization for mobile networks
  - Touch-friendly interface design
  - Regular mobile usability testing

### 10.5 Deployment & Operations Risks

#### Risk: Failed deployment or rollback issues
- **Impact:** Critical - Site unavailability during critical period
- **Mitigation:**
  - Blue-green deployment strategy
  - Automated rollback procedures
  - Deployment testing in staging environment
  - Deployment checklist and runbook
  - 24/7 on-call support during critical periods

#### Risk: Environment configuration errors
- **Impact:** High - Functionality failures in production
- **Mitigation:**
  - Environment parity between dev/staging/production
  - Infrastructure as Code (IaC) for consistency
  - Configuration validation scripts
  - Automated deployment verification tests
  - Environment-specific documentation

**Risk Assessment Matrix:**
- **Critical (C):** Immediate action required, business impact severe
- **High (H):** Priority attention needed, significant impact
- **Medium (M):** Manageable with proper planning, moderate impact

**Overall Risk Level:** LOW - Comprehensive mitigation strategies in place for all identified risks.

---

## 11. Appendix

### 11.1 Reference Documentation

#### Development Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility compliance reference
- [React Documentation](https://react.dev/) - Official React framework documentation
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Vite Documentation](https://vitejs.dev/guide/) - Modern build tool and dev server
- [SQLite Documentation](https://sqlite.org/docs.html) - Database engine documentation

#### Testing & Quality Assurance
- [Vitest Documentation](https://vitest.dev/) - Unit testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing utilities
- [Playwright Documentation](https://playwright.dev/) - End-to-end testing framework
- [axe-core Documentation](https://github.com/dequelabs/axe-core) - Accessibility testing engine

#### Deployment & Operations
- [Netlify Documentation](https://docs.netlify.com/) - Frontend hosting platform
- [Railway Documentation](https://docs.railway.app/) - Backend hosting platform
- [Express.js Documentation](https://expressjs.com/) - Web framework for Node.js
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/) - Free SSL certificates

### 11.2 Design System Specifications

#### Color Palette (Wedding Theme)
```css
/* Primary Colors */
--wedding-blush: #f7d7d7;      /* Primary romantic accent */
--wedding-sage: #9caf88;       /* Natural, calming green */
--wedding-ivory: #f8f6f0;      /* Elegant neutral base */
--wedding-gold: #d4af37;       /* Luxury accent color */
--wedding-navy: #2c3e50;       /* Sophisticated dark */

/* Extended Palette */
--wedding-rose: #e8b4b8;       /* Deeper blush variant */
--wedding-mint: #b8d4c2;       /* Light sage variant */
--wedding-cream: #faf8f3;      /* Lighter ivory variant */
--wedding-bronze: #cd7f32;     /* Deeper gold variant */
--wedding-charcoal: #34495e;   /* Lighter navy variant */

/* Functional Colors */
--success: #27ae60;            /* Form success states */
--warning: #f39c12;            /* Warning messages */
--error: #e74c3c;              /* Error states */
--info: #3498db;               /* Informational content */
```

#### Typography Specifications
```css
/* Font Families */
--font-heading: 'Playfair Display', serif;  /* Elegant serif for headings */
--font-body: 'Inter', sans-serif;           /* Modern sans-serif for body */
--font-accent: 'Dancing Script', cursive;   /* Script font for special text */

/* Font Sizes (clamp for responsive) */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
```

#### Spacing System
```css
/* Consistent spacing scale */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
```

### 11.3 Browser Support Matrix

| Browser | Minimum Version | Features Supported | Notes |
|---------|----------------|-------------------|-------|
| Chrome | 90+ | Full ES2020, CSS Grid, Custom Properties | Primary development target |
| Firefox | 88+ | Full ES2020, CSS Grid, Custom Properties | Full feature parity |
| Safari | 14+ | ES2020, CSS Grid, Custom Properties | iOS Safari included |
| Edge | 90+ | Full ES2020, CSS Grid, Custom Properties | Chromium-based |

#### Polyfills Required
- None (modern browser targets only)
- Graceful degradation for unsupported features

### 11.4 Performance Budgets

#### Bundle Size Limits
- **Main Bundle:** 150KB gzipped
- **Vendor Bundle:** 300KB gzipped
- **CSS Bundle:** 50KB gzipped
- **Total Initial Load:** 500KB gzipped

#### Loading Performance Targets
- **First Contentful Paint (FCP):** < 2.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### 11.5 Security Headers Configuration

```apache
# Security Headers (for production deployment)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' *.googletagmanager.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: *.googleapis.com; connect-src 'self' *.railway.app;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

### 11.6 Environment Variables Reference

#### Frontend (.env)
```bash
# Development
VITE_API_URL=http://localhost:3001/api
NODE_ENV=development

# Production
VITE_API_URL=https://api.ansonandpartner.wedding/api
NODE_ENV=production
```

#### Backend (.env)
```bash
# Development
NODE_ENV=development
PORT=3001
DB_PATH=./api/db/database.sqlite

# Production  
NODE_ENV=production
PORT=8080
DB_PATH=/app/data/database.sqlite
```

### 11.7 Accessibility Testing Checklist

#### Automated Testing
- [ ] axe-core integration in unit tests
- [ ] Lighthouse accessibility audit ≥ 95%
- [ ] Pa11y command-line testing
- [ ] Automated color contrast verification

#### Manual Testing Requirements
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] High contrast mode verification
- [ ] Zoom testing (up to 200%)
- [ ] Focus indicator visibility

### 11.8 SEO Optimization Checklist

#### Technical SEO
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (H1 → H6)
- [ ] Meta description under 160 characters
- [ ] Title tags under 60 characters
- [ ] Open Graph metadata complete
- [ ] Twitter Card metadata complete
- [ ] Structured data (JSON-LD) implementation
- [ ] XML sitemap generation
- [ ] Robots.txt configuration

#### Content SEO
- [ ] Descriptive alt text for all images
- [ ] Internal linking strategy
- [ ] Mobile-friendly content structure
- [ ] Page loading speed optimization
- [ ] Social media sharing optimization

---

**Document Version:** 2.0  
**Last Updated:** July 27, 2025  
**Next Review:** Post-deployment (estimated August 2025)
