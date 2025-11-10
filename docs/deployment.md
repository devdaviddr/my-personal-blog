# Deployment Guide

This guide covers deploying your Developer Blog Platform as a static site to various hosting platforms. Since this is a static site built with Vite, you can deploy it to any static hosting service.

## Prerequisites

Before deploying, ensure you have:

- ✅ Project built and tested locally
- ✅ Content created in markdown format
- ✅ Custom domain (optional, but recommended)

## Build Process

### Local Build

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# The built files will be in packages/frontend/dist/
```

### Verify Build

```bash
# Preview the production build locally
pnpm preview

# Test that all routes work correctly
# Check that content loads properly
```

## Deployment Options

### Vercel (Recommended)

Vercel offers the best developer experience with automatic deployments and excellent performance.

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
pnpm add -D vercel

# Deploy
cd packages/frontend
vercel

# Follow the prompts to configure your project
```

#### Option B: Git Integration

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   ```
   Framework Preset: Vite
   Root Directory: packages/frontend
   Build Command: pnpm build
   Output Directory: dist
   Install Command: pnpm install
   ```

3. **Environment Variables** (if needed):
   - Add any environment variables your app requires

4. **Deploy**: Vercel will automatically deploy on every push to main

#### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Netlify

Netlify is another excellent choice with great performance and features.

#### Git Integration

1. **Connect Repository**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   ```
   Base directory: packages/frontend
   Build command: pnpm build
   Publish directory: dist
   ```

3. **Environment Variables**:
   - Add any required environment variables

4. **Deploy**: Netlify will build and deploy automatically

#### Netlify CLI

```bash
# Install Netlify CLI
pnpm add -D netlify-cli

# Build and deploy
cd packages/frontend
netlify build
netlify deploy --prod
```

### GitHub Pages

Free hosting for public repositories.

#### Setup

```bash
# Install gh-pages
cd packages/frontend
pnpm add -D gh-pages

# Add deploy script to package.json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

#### Deploy

```bash
# Build and deploy
cd packages/frontend
pnpm build
pnpm deploy
```

#### Custom Domain

1. Create `packages/frontend/public/CNAME` with your domain
2. Go to repository Settings → Pages
3. Add your custom domain
4. Configure DNS records as instructed

### Railway

Modern cloud platform with excellent developer experience.

1. **Connect Repository**:
   - Go to [Railway Dashboard](https://railway.app)
   - Click "New Project"
   - Connect your GitHub repository

2. **Configure**:
   ```
   Build Command: pnpm build
   Start Command: (leave empty for static sites)
   Root Directory: packages/frontend
   ```

3. **Environment Variables**: Add any required variables

### Render

Free static site hosting with good performance.

1. **Connect Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure**:
   ```
   Build Command: pnpm build
   Publish Directory: packages/frontend/dist
   ```

### Cloudflare Pages

If you prefer to stay within the Cloudflare ecosystem.

1. **Connect Repository**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub repository

2. **Build Settings**:
   ```
   Build command: pnpm build
   Build output directory: packages/frontend/dist
   Root directory: packages/frontend
   ```

## Environment Variables

### Development vs Production

Create environment files for different environments:

```bash
# Development
packages/frontend/.env.local

# Production (set in hosting platform)
# These will be different for each platform
```

### Common Variables

```env
# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Social media (optional)
VITE_TWITTER_HANDLE=@yourhandle
VITE_GITHUB_USERNAME=yourusername

# Site configuration
VITE_SITE_TITLE="Your Blog Title"
VITE_SITE_DESCRIPTION="Your blog description"
```

## Custom Domain Setup

### DNS Configuration

Most hosting platforms provide DNS instructions. Generally:

1. **Add CNAME record**: `www.yourdomain.com` → `your-platform-domain.com`
2. **Add A record**: `yourdomain.com` → platform IP (if required)
3. **Configure SSL**: Most platforms handle this automatically

### Domain Providers

- **Namecheap**: Good for developers, reasonable pricing
- **Cloudflare**: Free DNS with additional features
- **Google Domains**: Simple interface
- **GoDaddy**: Popular but more expensive

## Performance Optimization

### Build Optimizations

The project is already optimized, but you can further improve:

```javascript
// packages/frontend/vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### Content Optimization

- Use WebP images for better compression
- Optimize images before adding to content
- Keep markdown files reasonably sized
- Use lazy loading for images

## Monitoring and Analytics

### Google Analytics

1. Create a GA4 property
2. Add the measurement ID to your environment variables
3. The app will automatically include GA tracking

### Other Analytics

- **Vercel Analytics**: Built-in analytics for Vercel deployments
- **Netlify Analytics**: Available on paid plans
- **Plausible**: Privacy-focused analytics
- **Fathom**: Lightweight analytics

## SEO Optimization

### Meta Tags

The app automatically generates meta tags from your content frontmatter. Ensure each post has:

- Descriptive title
- Good description
- Relevant tags
- Author information

### Sitemap

Consider adding a sitemap generation script for better SEO.

## Backup and Recovery

### Content Backup

Since content is in markdown files:

```bash
# Backup content
cp -r content/ backup/content-$(date +%Y%m%d)/

# Backup entire project
git add .
git commit -m "Backup: $(date)"
git push origin main
```

### Database Migration (Future)

If you add a database later, plan for migration:

1. Export data from old system
2. Transform data to new format
3. Import into new system
4. Update application code
5. Test thoroughly

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and rebuild
cd packages/frontend
rm -rf node_modules dist
pnpm install
pnpm build
```

#### Content Not Loading

- Check that markdown files have correct frontmatter
- Ensure `published: true` for live content
- Verify file paths in import.meta.glob patterns

#### Routing Issues

- Test all routes locally with `pnpm preview`
- Check that your hosting platform supports SPA routing
- Add `_redirects` file for Netlify or `vercel.json` for Vercel

#### Performance Issues

- Check bundle size with `pnpm build --mode analyze`
- Optimize images and reduce unused dependencies
- Enable compression on your hosting platform

### Platform-Specific Issues

#### Vercel
- Check build logs in dashboard
- Ensure correct root directory setting
- Verify environment variables are set

#### Netlify
- Check deploy logs
- Ensure publish directory is correct
- Verify build hooks are working

#### GitHub Pages
- Ensure repository is public
- Check that gh-pages branch is created
- Verify custom domain settings

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

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
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: packages/frontend
```

## Security Considerations

### Content Security Policy

Add CSP headers if your hosting platform supports it:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
```

### HTTPS

All major hosting platforms provide HTTPS automatically. Ensure your custom domain has SSL enabled.

### Environment Variables

Never commit sensitive information to your repository. Use the hosting platform's environment variable management.

## Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| Vercel | 100GB bandwidth | $20+/month | Best DX |
| Netlify | 100GB bandwidth | $19+/month | Features |
| GitHub Pages | Unlimited | Free | Simple sites |
| Railway | 512MB RAM | $5+/month | Full-stack |
| Render | 100GB bandwidth | $7+/month | Static sites |

## Migration Between Platforms

### From One Platform to Another

1. **Backup content and configuration**
2. **Update DNS records** (if changing domains)
3. **Configure new platform** with same settings
4. **Test deployment** thoroughly
5. **Update DNS** to point to new platform
6. **Monitor** for any issues

### Adding a Backend Later

If you decide to add dynamic features:

1. Keep the frontend as a static site
2. Add a separate API service
3. Update frontend to call the new API
4. Choose a platform that supports both static and API deployment

---

**Next:** [Configuration Guide](./configuration.md)