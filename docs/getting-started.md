# Getting Started

Welcome to the Developer Blog Platform! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Cloudflare account** for deployment
- **Wrangler CLI** for Cloudflare development

### Installing Prerequisites

#### Node.js and npm
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from https://nodejs.org/
# Or use a version manager like nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Wrangler CLI
```bash
npm install -g wrangler
wrangler login
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/developer-blog-platform.git
cd developer-blog-platform
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install API dependencies
cd api
npm install
cd ..
```

### 3. Environment Configuration

Create environment files from the templates:

```bash
# Frontend environment
cp .env.example .env.local

# API environment (if separate)
cp api/.env.example api/.env.local
```

Edit `.env.local` with your configuration:

```env
# Required for local development
VITE_API_URL=http://localhost:8787

# Database (will be configured in step 4)
DATABASE_URL=""
DATABASE_ID=""

# Optional: Authentication
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Optional: Analytics
GOOGLE_ANALYTICS_ID=""
```

### 4. Database Setup

#### Create Cloudflare D1 Database

```bash
# Create a new D1 database
npx wrangler d1 create blog-db

# This will output something like:
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

#### Update wrangler.toml

Edit `api/wrangler.toml` with your database information:

```toml
name = "developer-blog-api"
main = "src/index.ts"
compatibility_date = "2023-10-30"

[[d1_databases]]
binding = "DB"
database_name = "blog-db"
database_id = "your-database-id-from-above"
```

#### Initialize Database Schema

```bash
# Apply database migrations
npx wrangler d1 execute blog-db --file=./api/db/schema.sql

# Seed with sample data (optional)
npx wrangler d1 execute blog-db --file=./api/db/seed.sql
```

### 5. Start Development Servers

You'll need to run both the frontend and API servers:

#### Terminal 1 - API Server
```bash
cd api
npm run dev
```

#### Terminal 2 - Frontend Server
```bash
npm run dev
```

Your blog should now be accessible at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8787

## Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the blog homepage
3. Try creating a new post (if authentication is set up)
4. Check the API health endpoint: http://localhost:8787/health

## Next Steps

Now that you have the blog running locally:

1. **Customize the theme** - Edit Tailwind configuration
2. **Add content** - Create your first blog post
3. **Configure authentication** - Set up GitHub OAuth (optional)
4. **Deploy to production** - See [Deployment Guide](./deployment.md)

## Common Issues

### Port Already in Use
If you get "port already in use" errors:

```bash
# Kill processes on ports 3000 and 8787
npx kill-port 3000
npx kill-port 8787
```

### Database Connection Issues
- Ensure your `wrangler.toml` has the correct database_id
- Run `wrangler auth login` to authenticate with Cloudflare
- Check that the database was created: `wrangler d1 list`

### Dependency Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install

# For the API
cd api
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. **Make changes** to your code
2. **Test locally** with both servers running
3. **Commit changes** to Git
4. **Deploy to staging** (optional)
5. **Deploy to production**

## Getting Help

- Check the [API Reference](./api-reference.md) for backend questions
- See [Configuration](./configuration.md) for setup options
- Join our [Discord community](https://discord.gg/yourdiscord)
- Open an [issue on GitHub](https://github.com/yourusername/developer-blog-platform/issues)

---

**Next:** [Configuration Guide](./configuration.md)