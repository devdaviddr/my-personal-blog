# Configuration Guide

This guide covers all configuration options available in the Developer Blog Platform.

## Configuration Files Overview

```
├── packages/frontend/.env.local    # Environment variables
├── packages/frontend/tailwind.config.js    # Styling configuration
├── packages/frontend/vite.config.ts       # Build configuration
├── packages/frontend/tsconfig.json        # TypeScript configuration
└── content/                              # Content directory
```

## Environment Variables

### Frontend Configuration (`.env.local`)

```env
# Site Information
VITE_SITE_TITLE="Your Blog Title"
VITE_SITE_DESCRIPTION="A modern blog for developers"
VITE_SITE_URL="https://yourdomain.com"
VITE_SITE_AUTHOR="Your Name"

# Social Media (Optional)
VITE_TWITTER_HANDLE="@yourtwitter"
VITE_GITHUB_USERNAME="yourgithub"

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Features (Optional)
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
VITE_POSTS_PER_PAGE=10
```

### Environment Variable Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_SITE_TITLE` | Your blog's title | "Developer Blog" | No |
| `VITE_SITE_DESCRIPTION` | Brief site description | "A modern blog for developers" | No |
| `VITE_SITE_URL` | Full URL of your site | - | No |
| `VITE_SITE_AUTHOR` | Your name | - | No |
| `VITE_TWITTER_HANDLE` | Twitter handle for social sharing | - | No |
| `VITE_GITHUB_USERNAME` | GitHub username | - | No |
| `VITE_GOOGLE_ANALYTICS_ID` | Google Analytics ID | - | No |
| `VITE_ENABLE_ANALYTICS` | Enable Google Analytics | false | No |
| `VITE_ENABLE_DARK_MODE` | Enable dark mode toggle | true | No |
| `VITE_POSTS_PER_PAGE` | Posts per page (future use) | 10 | No |

## Content Configuration

### Content Directory Structure

```
content/
├── articles/          # Blog posts
│   ├── 2024-01-01-first-post.md
│   └── 2024-01-02-second-post.md
└── projects/          # Project showcases
    ├── project-1.md
    └── project-2.md
```

### Markdown Frontmatter

All content files use YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: "2024-11-10"
author: "Your Name"
description: "Brief description for previews"
tags: ["tag1", "tag2", "tag3"]
published: true
---
```

#### Frontmatter Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `title` | string | Post/project title | Yes |
| `date` | string | Publication date (YYYY-MM-DD) | Yes |
| `author` | string | Author name | No |
| `description` | string | Brief description | No |
| `tags` | array | Tags for categorization | No |
| `published` | boolean | Whether to show content | No (defaults to true) |
| `demo` | string | Demo URL (projects only) | No |

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
        accent: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
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
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
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
  ],
}
```

### Customizing Colors

To change the color scheme, update the `colors` section:

```javascript
colors: {
  primary: {
    50: '#your-lightest-shade',
    500: '#your-main-color',
    600: '#your-hover-color',
    700: '#your-active-color',
    900: '#your-darkest-shade',
  },
  accent: {
    // Same structure for accent colors
  }
}
```

## Vite Configuration

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          markdown: ['gray-matter', 'remark', 'remark-html'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

### Build Optimization

The configuration includes:

- **Code splitting**: Separates vendor, router, and markdown libraries
- **Asset optimization**: Optimizes images and fonts
- **Tree shaking**: Removes unused code
- **Minification**: Reduces bundle size

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

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Feature Configuration

### Feature Flags

Features can be enabled/disabled via environment variables:

```typescript
// src/config/features.ts
export const features = {
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
} as const
```

### Adding New Features

1. Add environment variable to `.env.local`
2. Update feature flags in `src/config/features.ts`
3. Use feature flags in components:

```tsx
import { features } from '@/config/features'

function Header() {
  return (
    <header>
      {/* Always shown */}
      <Logo />

      {features.darkMode && <DarkModeToggle />}
      {features.analytics && <Analytics />}
    </header>
  )
}
```

## SEO Configuration

### Meta Tags

The app automatically generates meta tags from content frontmatter. For custom pages, you can add:

```tsx
// src/components/SEO.tsx
interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEO({ title, description, image, url }: SEOProps) {
  const siteTitle = import.meta.env.VITE_SITE_TITLE
  const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION
  const siteUrl = import.meta.env.VITE_SITE_URL

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const fullDescription = description || siteDescription
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
    </>
  )
}
```

## Content Processing Configuration

### Markdown Processing

The app uses Remark for markdown processing with these plugins:

- **remark-gfm**: GitHub Flavored Markdown support
- **remark-html**: Convert markdown to HTML

### Customizing Markdown

To add custom markdown processing:

```typescript
// src/lib/markdown.ts
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
// Add more plugins as needed

export async function processMarkdown(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown)
  return result.toString()
}
```

## Development Configuration

### Local Development

For local development, create `packages/frontend/.env.local`:

```env
VITE_SITE_TITLE="My Dev Blog (Local)"
VITE_SITE_URL="http://localhost:5173"
```

### Production Configuration

For production, set environment variables in your hosting platform:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **GitHub Pages**: Repository Secrets (for GitHub Actions)

## Performance Configuration

### Bundle Analysis

To analyze bundle size:

```bash
# Install analyzer
pnpm add -D rollup-plugin-visualizer

# Update vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
    }),
  ],
})
```

### Image Optimization

For better performance, optimize images:

1. Use WebP format when possible
2. Compress images before adding to content
3. Use responsive images with `srcset`

---

**Next:** [Contributing Guide](./contributing.md)