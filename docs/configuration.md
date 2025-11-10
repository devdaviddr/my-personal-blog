# Configuration Guide

This guide covers all configuration options available in the Developer Blog Platform.

## Configuration Files Overview

```
├── .env.local                 # Frontend environment variables
├── api/.env.local            # API environment variables
├── api/wrangler.toml         # Cloudflare Workers configuration
├── tailwind.config.js        # Styling configuration
├── vite.config.ts           # Build configuration
└── tsconfig.json            # TypeScript configuration
```

## Environment Variables

### Frontend Configuration (`.env.local`)

```env
# API Configuration
VITE_API_URL=http://localhost:8787
VITE_API_VERSION=v1

# Authentication
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_ENABLE_AUTH=true

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true

# Features
VITE_ENABLE_COMMENTS=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_DARK_MODE=true

# Content
VITE_POSTS_PER_PAGE=10
VITE_BLOG_TITLE="Developer Blog"
VITE_BLOG_DESCRIPTION="A modern blog for developers"
VITE_BLOG_AUTHOR="Your Name"

# SEO
VITE_SITE_URL=https://yourdomain.com
VITE_TWITTER_HANDLE=@yourtwitter
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

### API Configuration (`api/.env.local`)

```env
# Database
DATABASE_URL=local_database_url
DATABASE_ID=local_database_id

# Authentication
JWT_SECRET=your_jwt_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
AUTH_CALLBACK_URL=http://localhost:3000/auth/callback

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_ANONYMOUS=100
RATE_LIMIT_AUTHENTICATED=1000
RATE_LIMIT_WINDOW=3600

# Email (Optional)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Storage (Optional)
R2_BUCKET_NAME=your_r2_bucket
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key

# Monitoring
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

## Cloudflare Workers Configuration

### Basic `wrangler.toml`

```toml
name = "developer-blog-api"
main = "src/index.ts"
compatibility_date = "2023-10-30"
node_compat = true

[build]
command = "npm run build"

# Development environment
[env.development]
[[env.development.d1_databases]]
binding = "DB"
database_name = "blog-db-dev"
database_id = "your-dev-database-id"

# Production environment
[env.production]
name = "developer-blog-api-prod"
route = { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }

[[env.production.d1_databases]]
binding = "DB"
database_name = "blog-db-prod"
database_id = "your-prod-database-id"

# Optional: R2 storage for file uploads
[[env.production.r2_buckets]]
binding = "UPLOADS"
bucket_name = "blog-uploads"

# Environment variables (non-secret)
[env.production.vars]
ENVIRONMENT = "production"
LOG_LEVEL = "warn"
CORS_ORIGINS = "https://yourdomain.com,https://blog.yourdomain.com"
```

### Advanced Configuration

```toml
# Resource limits
[limits]
cpu_ms = 50

# Caching
[cache]
max_age = 86400

# Custom routes
[[routes]]
pattern = "api.yourdomain.com/v1/*"
zone_name = "yourdomain.com"

[[routes]]
pattern = "yourdomain.com/api/*"
zone_name = "yourdomain.com"
```

## Tailwind CSS Configuration

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            '[class~="lead"]': {
              color: theme('colors.gray.600'),
            },
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: theme('spacing.1'),
              paddingRight: theme('spacing.1'),
              paddingTop: theme('spacing.1'),
              paddingBottom: theme('spacing.1'),
              borderRadius: theme('borderRadius.sm'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            '[class~="lead"]': {
              color: theme('colors.gray.400'),
            },
            a: {
              color: theme('colors.primary.400'),
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

## Vite Configuration

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns', 'clsx'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
  },
});
```

## TypeScript Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### API TypeScript Configuration (`api/tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["@cloudflare/workers-types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Database Configuration

### Schema Configuration (`api/db/schema.sql`)

```sql
-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  website TEXT,
  github_id TEXT UNIQUE,
  twitter_handle TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  reading_time INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Post tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id TEXT,
  tag_id TEXT,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);

-- Comments table (optional)
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  post_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_post_tags_post ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id, approved);

-- Triggers for updated_at
CREATE TRIGGER IF NOT EXISTS update_authors_timestamp 
  AFTER UPDATE ON authors
  BEGIN
    UPDATE authors SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;

CREATE TRIGGER IF NOT EXISTS update_posts_timestamp 
  AFTER UPDATE ON posts
  BEGIN
    UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;
```

## Authentication Configuration

### JWT Configuration

```typescript
// api/src/config/auth.ts
export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiry: '7d',
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scopes: ['user:email'],
  },
  cookies: {
    name: 'auth-token',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};
```

## Feature Flags

### `src/config/features.ts`

```typescript
export const features = {
  auth: import.meta.env.VITE_ENABLE_AUTH === 'true',
  comments: import.meta.env.VITE_ENABLE_COMMENTS === 'true',
  search: import.meta.env.VITE_ENABLE_SEARCH === 'true',
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  newsletter: import.meta.env.VITE_ENABLE_NEWSLETTER === 'true',
  social: import.meta.env.VITE_ENABLE_SOCIAL === 'true',
} as const;
```

## SEO Configuration

### `src/config/seo.ts`

```typescript
export const seoConfig = {
  defaultTitle: import.meta.env.VITE_BLOG_TITLE || 'Developer Blog',
  titleTemplate: '%s | Developer Blog',
  description: import.meta.env.VITE_BLOG_DESCRIPTION || 'A modern blog for developers',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://yourdomain.com',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: import.meta.env.VITE_SITE_URL,
    siteName: import.meta.env.VITE_BLOG_TITLE,
    images: [
      {
        url: `${import.meta.env.VITE_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Developer Blog',
      },
    ],
  },
  
  twitter: {
    handle: import.meta.env.VITE_TWITTER_HANDLE,
    site: import.meta.env.VITE_TWITTER_HANDLE,
    cardType: 'summary_large_image',
  },
};
```

## Content Configuration

### `src/config/content.ts`

```typescript
export const contentConfig = {
  postsPerPage: parseInt(import.meta.env.VITE_POSTS_PER_PAGE || '10'),
  
  markdown: {
    plugins: ['gfm', 'highlight', 'math'],
    highlight: {
      theme: 'github-dark',
      languages: ['javascript', 'typescript', 'python', 'rust', 'go'],
    },
  },
  
  dateFormat: 'MMM dd, yyyy',
  excerptLength: 160,
  
  categories: [
    'Web Development',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'DevOps',
    'Tutorials',
  ],
};
```

## Monitoring Configuration

### `api/src/config/monitoring.ts`

```typescript
export const monitoringConfig = {
  logLevel: (process.env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
  enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING === 'true',
  
  metrics: {
    enabled: true,
    endpoint: '/metrics',
  },
  
  healthCheck: {
    endpoint: '/health',
    checks: ['database', 'external-apis'],
  },
  
  rateLimit: {
    anonymous: parseInt(process.env.RATE_LIMIT_ANONYMOUS || '100'),
    authenticated: parseInt(process.env.RATE_LIMIT_AUTHENTICATED || '1000'),
    window: parseInt(process.env.RATE_LIMIT_WINDOW || '3600'),
  },
};
```

---

**Next:** [Contributing Guide](./contributing.md)