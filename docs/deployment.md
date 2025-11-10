# Deployment Guide

This guide covers deploying your Developer Blog Platform to Cloudflare's edge network for maximum performance and global reach.

## Prerequisites

Before deploying, ensure you have:

- ✅ Cloudflare account
- ✅ Wrangler CLI installed and authenticated
- ✅ Project built and tested locally
- ✅ Domain name (optional, but recommended)

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│ Cloudflare      │    │ Cloudflare      │    │ Cloudflare D1   │
│ Pages           │◄───┤ Workers         │◄───┤ Database        │
│ (Frontend)      │    │ (API)           │    │ (SQLite)        │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Step-by-Step Deployment

### 1. Prepare for Deployment

#### Build the Project
```bash
# Install all dependencies
npm install
cd api && npm install && cd ..

# Build frontend
npm run build

# Build API
cd api && npm run build && cd ..
```

#### Environment Variables
Set up production environment variables in Cloudflare:

```bash
# For the frontend (Pages)
wrangler pages secret put VITE_API_URL
# Enter: https://your-api.your-domain.workers.dev

# For the API (Workers)
cd api
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put JWT_SECRET
```

### 2. Deploy Database (D1)

#### Create Production Database
```bash
# Create production D1 database
wrangler d1 create blog-db-prod

# Note the database_id from the output
# Update api/wrangler.toml with production database_id
```

#### Update wrangler.toml
```toml
name = "developer-blog-api"
main = "src/index.ts"
compatibility_date = "2023-10-30"

[env.production]
[[env.production.d1_databases]]
binding = "DB"
database_name = "blog-db-prod"
database_id = "your-production-database-id"
```

#### Deploy Schema
```bash
# Apply schema to production database
wrangler d1 execute blog-db-prod --file=./db/schema.sql --env production

# Optional: Seed with initial data
wrangler d1 execute blog-db-prod --file=./db/seed.sql --env production
```

### 3. Deploy API (Cloudflare Workers)

```bash
cd api

# Deploy to production
wrangler deploy --env production

# Your API will be available at:
# https://developer-blog-api.your-subdomain.workers.dev
```

#### Verify API Deployment
```bash
curl https://developer-blog-api.your-subdomain.workers.dev/health
```

### 4. Deploy Frontend (Cloudflare Pages)

#### Option A: Git Integration (Recommended)

1. **Connect Repository to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   ```
   Framework preset: React
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

3. **Set Environment Variables:**
   ```
   VITE_API_URL=https://developer-blog-api.your-subdomain.workers.dev
   NODE_VERSION=18
   ```

#### Option B: Direct Upload

```bash
# Build the project
npm run build

# Deploy to Pages
wrangler pages deploy dist --project-name developer-blog
```

### 5. Custom Domain Setup (Optional)

#### For the Frontend (Pages)
1. Go to Pages → Your Project → Custom domains
2. Add your domain (e.g., `blog.yourdomain.com`)
3. Update DNS records as instructed

#### For the API (Workers)
1. Go to Workers → Your Worker → Settings → Triggers
2. Add custom domain (e.g., `api.yourdomain.com`)
3. Update DNS records

#### Update Environment Variables
After setting up custom domains, update the API URL:

```bash
# Update frontend environment
wrangler pages secret put VITE_API_URL
# Enter: https://api.yourdomain.com
```

## Environment-Specific Configurations

### Staging Environment

Create a staging environment for testing:

```bash
# Create staging database
wrangler d1 create blog-db-staging

# Deploy API to staging
wrangler deploy --env staging

# Deploy frontend to staging
wrangler pages deploy dist --project-name developer-blog-staging
```

### Production Environment

```toml
# api/wrangler.toml
[env.production]
name = "developer-blog-api-prod"
route = "api.yourdomain.com/*"

[[env.production.d1_databases]]
binding = "DB"
database_name = "blog-db-prod"
database_id = "production-database-id"

[env.production.vars]
ENVIRONMENT = "production"
LOG_LEVEL = "warn"
```

## Database Migrations

### Running Migrations

```bash
# Create a new migration
wrangler d1 migrations create blog-db-prod "add_views_column"

# Apply migrations
wrangler d1 migrations apply blog-db-prod --env production
```

### Migration Example

```sql
-- migrations/0002_add_views_column.sql
ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0;
UPDATE posts SET views = 0 WHERE views IS NULL;
```

## Monitoring and Observability

### Cloudflare Analytics

Enable analytics in your Cloudflare dashboard:

1. **Pages Analytics**: Monitor frontend performance
2. **Workers Analytics**: Track API usage and performance
3. **D1 Analytics**: Monitor database queries and performance

### Custom Logging

Add structured logging to your API:

```typescript
// api/src/utils/logger.ts
export function logError(error: Error, context: any) {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'error',
    message: error.message,
    stack: error.stack,
    context
  }));
}
```

### Health Checks

Monitor your deployment health:

```bash
# Check API health
curl https://api.yourdomain.com/health

# Check database connectivity
curl https://api.yourdomain.com/api/posts?limit=1
```

## Security Considerations

### Environment Secrets

Never commit secrets to your repository:

```bash
# Set secrets via Wrangler
wrangler secret put JWT_SECRET
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put DATABASE_ENCRYPTION_KEY
```

### CORS Configuration

Configure CORS properly for your domain:

```typescript
// api/src/middleware/cors.ts
export const corsMiddleware = cors({
  origin: [
    'https://yourdomain.com',
    'https://blog.yourdomain.com'
  ],
  credentials: true
});
```

### Content Security Policy

Add CSP headers for security:

```typescript
// In your Hono app
app.use('*', async (c, next) => {
  await next();
  c.header('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' 'unsafe-inline';"
  );
});
```

## Performance Optimization

### Caching Strategy

```typescript
// Cache API responses
app.get('/api/posts', cache(300), async (c) => {
  // Your handler
});

// Cache static assets
app.use('/static/*', cache(86400));
```

### Database Optimization

```sql
-- Create indexes for better performance
CREATE INDEX idx_posts_published ON posts(published, published_at);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_post_tags_post ON post_tags(post_id);
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check database binding
wrangler d1 list

# Verify wrangler.toml configuration
cat api/wrangler.toml
```

#### 2. API Not Found (404)
- Check Workers route configuration
- Verify deployment was successful
- Check custom domain DNS settings

#### 3. CORS Errors
- Verify API URL in frontend environment variables
- Check CORS middleware configuration
- Ensure domains are whitelisted

#### 4. Build Failures
```bash
# Clear build cache
rm -rf dist node_modules
npm install
npm run build
```

### Debugging

#### View Worker Logs
```bash
wrangler tail developer-blog-api --env production
```

#### Test Database Connection
```bash
wrangler d1 execute blog-db-prod --command "SELECT COUNT(*) FROM posts;" --env production
```

## Rollback Strategy

### API Rollback
```bash
# Deploy previous version
git checkout previous-tag
cd api && wrangler deploy --env production
```

### Database Rollback
```bash
# Create backup before deployment
wrangler d1 execute blog-db-prod --command ".dump" --env production > backup.sql

# Restore if needed
wrangler d1 execute blog-db-prod --file backup.sql --env production
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

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
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy API
        run: cd api && npx wrangler deploy --env production
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      
      - name: Deploy Pages
        run: npx wrangler pages deploy dist --project-name developer-blog
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

**Next:** [Configuration Guide](./configuration.md)