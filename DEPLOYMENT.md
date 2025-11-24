# Deployment Guide - Menify

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   Add the same variables as Vercel

### Option 3: Self-Hosted (VPS/Cloud)

#### Prerequisites:
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

#### Steps:

1. **Clone and Install**
   ```bash
   git clone your-repo-url
   cd menify
   npm install
   ```

2. **Build Production**
   ```bash
   npm run build
   ```

3. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "menify" -- start
   pm2 save
   pm2 startup
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## 🔐 Environment Variables

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Post-Deployment Checklist

- [ ] Test menu page loads correctly
- [ ] Verify all images load
- [ ] Test search functionality
- [ ] Check WhatsApp button works
- [ ] Test on mobile devices
- [ ] Verify QR code scanning works
- [ ] Check admin login
- [ ] Test on different browsers

## 🔍 Monitoring & Analytics

### Vercel Analytics (Free)
Enable in Vercel dashboard for:
- Page views
- Performance metrics
- Web Vitals

### Google Analytics (Optional)
Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

// Add in layout
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## 🐛 Troubleshooting

### Build Errors

**Error: Cannot find module '@/...'**
- Check `tsconfig.json` paths configuration
- Ensure all imports use `@/` prefix

**Error: Supabase connection failed**
- Verify environment variables are set
- Check Supabase project is active
- Verify RLS policies are correct

### Runtime Errors

**Error: Restaurant not found**
- Check database has seed data
- Verify slug matches URL
- Check `is_active` is true

**Images not loading**
- Verify image URLs are accessible
- Check Supabase Storage permissions
- Add domain to `next.config.ts` if using external images

## 📈 Performance Optimization

### Image Optimization
- Use Next.js Image component (already implemented)
- Enable Supabase Image Transformation
- Consider WebP format

### Caching
Add to `next.config.ts`:

```typescript
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}
```

### Database Optimization
- Add indexes (already in schema)
- Enable Supabase connection pooling
- Use ISR for menu pages

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test # if you have tests
```

## 📱 QR Code Generation

After deployment, generate QR codes:

1. Go to admin dashboard
2. Click "QR Code" (when implemented)
3. Download PNG
4. Print and place on tables

Or use online tools:
- [QR Code Generator](https://www.qr-code-generator.com/)
- Input: `https://yourdomain.com/r/demo`

## 🎯 SEO Optimization

### Sitemap
Create `app/sitemap.ts`:

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
    },
    {
      url: 'https://yourdomain.com/r/demo',
      lastModified: new Date(),
    },
  ]
}
```

### Robots.txt
Create `app/robots.ts`:

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

## 📞 Support

For deployment issues:
- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Check [Supabase Docs](https://supabase.com/docs)
- Check [Vercel Support](https://vercel.com/support)

---

Happy Deploying! 🚀
