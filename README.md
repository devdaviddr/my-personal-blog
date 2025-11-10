# Developer Blog Platform 🚀

A modern, reusable blog platform built specifically for developers. Built with React, TypeScript, Tailwind CSS, Hono.js, and Cloudflare technologies for maximum performance and scalability.

## 📸 Screenshot

![Developer Blog Platform](./docs/screen.png)

*Modern, clean interface optimized for developer content with dark mode support and responsive design.*

## ✨ Features

- **Modern Tech Stack**: React 18 + TypeScript for type-safe development
- **Beautiful UI**: Tailwind CSS for responsive, utility-first styling
- **High Performance**: Hono.js for ultra-fast API endpoints
- **Edge Deployment**: Cloudflare Workers for global distribution
- **Database**: Cloudflare D1 for serverless SQLite database
- **Markdown Support**: Write posts in Markdown with syntax highlighting
- **SEO Optimized**: Built-in SEO features and meta tag management
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Built-in dark/light theme switching
- **Fast Loading**: Optimized for Core Web Vitals
- **Developer Focused**: Code block highlighting, technical writing features

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation build tool

### Backend
- **Hono.js** - Ultra-fast web framework for Cloudflare Workers
- **Cloudflare Workers** - Serverless compute platform
- **Cloudflare D1** - Serverless SQLite database

### Deployment
- **Cloudflare Pages** - Frontend hosting
- **Cloudflare Workers** - API hosting
- **Cloudflare D1** - Database hosting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account
- Wrangler CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/developer-blog-platform.git
   cd developer-blog-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Initialize Cloudflare D1 database**
   ```bash
   npx wrangler d1 create blog-db
   npx wrangler d1 execute blog-db --file=./schema.sql
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Start the API server**
   ```bash
   npm run dev:api
   ```

Visit `http://localhost:3000` to see your blog!

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles and Tailwind config
│   └── types/              # TypeScript type definitions
├── api/
│   ├── src/                # Hono.js API routes
│   ├── db/                 # Database schema and migrations
│   └── wrangler.toml       # Cloudflare Workers configuration
├── docs/                   # Documentation
├── public/                 # Static assets
└── package.json
```

## 📖 Documentation

For detailed documentation, see the [docs folder](./docs/):

- [Getting Started](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Deployment Guide](./docs/deployment.md)
- [Configuration](./docs/configuration.md)
- [Contributing](./docs/contributing.md)

## 🎨 Customization

This platform is designed to be easily customizable:

1. **Theming**: Modify Tailwind configuration in `tailwind.config.js`
2. **Components**: Create your own components in `src/components/`
3. **Layouts**: Customize page layouts in `src/components/layout/`
4. **Content**: Add your own content types and fields

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=your-d1-database-url
DATABASE_ID=your-d1-database-id

# Authentication (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your-ga-id
```

### Cloudflare Configuration

Update `wrangler.toml` with your account details:

```toml
name = "developer-blog-api"
main = "src/index.ts"
compatibility_date = "2023-10-30"

[[d1_databases]]
binding = "DB"
database_name = "blog-db"
database_id = "your-database-id"
```

## 🚀 Deployment

### Deploy to Cloudflare

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the API**
   ```bash
   cd api && npm run deploy
   ```

3. **Deploy the frontend**
   ```bash
   npm run deploy
   ```

For detailed deployment instructions, see [Deployment Guide](./docs/deployment.md).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hono.js](https://hono.dev/) for the amazing web framework
- [Cloudflare](https://cloudflare.com/) for the edge platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the UI library


**Built with ❤️ for the developer community**