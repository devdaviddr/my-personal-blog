# Getting Started

Welcome to the Developer Blog Platform! This guide will help you get up and running quickly with your static blog.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** package manager (recommended) or **npm**
- **Git** for version control

### Installing Prerequisites

#### Node.js and pnpm
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from https://nodejs.org/
# Or use a version manager like nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install pnpm globally
npm install -g pnpm
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/developer-blog-platform.git
cd developer-blog-platform
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install
```

### 3. Start Development Server

```bash
# Start the development server
pnpm dev
```

Your blog should now be accessible at:
- **Local Development**: http://localhost:5173

## Adding Your Content

### Creating Blog Posts

1. Create a new file in `content/articles/` with the format: `YYYY-MM-DD-your-post-title.md`

2. Add frontmatter and content:

```markdown
---
title: "Your First Blog Post"
date: "2024-11-10"
author: "Your Name"
description: "A brief description of your post"
tags: ["introduction", "web-development"]
published: true
---

# Your First Blog Post

Welcome to your new blog! This is where your content goes.

You can write in **Markdown** and it will be automatically converted to HTML.

## Features

- Code syntax highlighting
- Responsive design
- SEO optimized
- Fast loading
```

### Creating Project Showcases

1. Create a new file in `content/projects/` with your project name: `your-project-name.md`

2. Add project details:

```markdown
---
title: "My Awesome Project"
date: "2024-11-05"
author: "Your Name"
description: "A brief description of your project"
tags: ["react", "typescript", "web-app"]
published: true
demo: "https://your-project-demo.com"
---

# My Awesome Project

## Overview

Describe your project here...

## Features

- Feature 1
- Feature 2
- Feature 3

## Tech Stack

- React
- TypeScript
- Tailwind CSS
```

## Customization

### Personalizing the Blog

1. **Update site information**: Edit the title, description, and author information in your content files

2. **Customize styling**: Modify `packages/frontend/src/styles/index.css` and `packages/frontend/tailwind.config.js`

3. **Add your photo/avatar**: Update the header component with your information

### Advanced Configuration

The blog uses Vite for building. You can customize the build process by editing:

- `packages/frontend/vite.config.ts` - Build configuration
- `packages/frontend/tailwind.config.js` - Styling configuration
- `packages/frontend/tsconfig.json` - TypeScript configuration

## Testing Your Setup

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Build for Production

```bash
# Build the project
pnpm build

# Preview the production build
pnpm preview
```

## Deployment Options

### Vercel (Recommended)

1. **Connect Repository**: Go to [Vercel](https://vercel.com) and connect your GitHub repository
2. **Configure Build**:
   - Build Command: `pnpm build`
   - Output Directory: `packages/frontend/dist`
3. **Deploy**: Vercel will automatically deploy on every push

### Netlify

1. **Connect Repository**: Go to [Netlify](https://netlify.com) and connect your repository
2. **Build Settings**:
   - Build Command: `pnpm build`
   - Publish Directory: `packages/frontend/dist`
3. **Deploy**: Netlify will build and deploy your site

### GitHub Pages

```bash
# Install gh-pages
pnpm add -D gh-pages

# Add deploy script to package.json
"deploy": "gh-pages -d packages/frontend/dist"

# Deploy
pnpm deploy
```

## Development Workflow

1. **Write Content**: Create markdown files in the `content/` directory
2. **Test Locally**: Use `pnpm dev` to preview changes
3. **Commit Changes**: Use conventional commit messages
4. **Deploy**: Push to your hosting platform

## Common Issues

### Content Not Showing Up

- Ensure your markdown files have `published: true` in the frontmatter
- Check that the file follows the correct naming convention
- Restart the development server

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Styling Issues

- Check that Tailwind CSS is properly configured
- Ensure your custom styles are imported in `main.tsx`

## Next Steps

Now that you have your blog running:

1. **Add More Content**: Create several blog posts and project showcases
2. **Customize Design**: Update colors, fonts, and layout
3. **Add Features**: Consider adding search, comments, or analytics
4. **Set Up Analytics**: Add Google Analytics or similar tracking
5. **Configure Domain**: Point a custom domain to your deployment

## Getting Help

- Check the [Configuration Guide](./configuration.md) for advanced setup
- Review the [API Reference](./api-reference.md) for content structure details
- Open an [issue](https://github.com/yourusername/developer-blog-platform/issues) on GitHub

---

**Next:** [Configuration Guide](./configuration.md)

---

**Next:** [Configuration Guide](./configuration.md)