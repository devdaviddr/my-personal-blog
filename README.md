# Developer Blog Platform

A modern, reusable blog platform built with React, TypeScript, Tailwind CSS, Hono.js, and Cloudflare technologies.

## Monorepo Structure

This project uses a monorepo structure with the following packages:

- `packages/frontend` - React + Vite + TypeScript + Tailwind frontend
- `packages/backend` - Hono.js + TypeScript API server

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Start both frontend and backend in development mode
npm run dev

# Or start them separately:
# Frontend only
cd packages/frontend && npm run dev

# Backend only
cd packages/backend && npm run dev
```

### Building

```bash
# Build all packages
npm run build

# Build individual packages
cd packages/frontend && npm run build
cd packages/backend && npm run build
```

### Testing

```bash
# Run all tests
npm test

# Run tests for individual packages
cd packages/frontend && npm test
cd packages/backend && npm test
```

### Code Quality

```bash
# Lint all packages
npm run lint

# Type check all packages
npm run type-check
```

## Project Structure

```
├── packages/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── pages/         # Page components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── utils/         # Utility functions
│   │   │   ├── types/         # TypeScript types
│   │   │   ├── lib/           # API clients, configs
│   │   │   ├── styles/        # Global styles
│   │   │   ├── assets/        # Static assets
│   │   │   ├── constants/     # App constants
│   │   │   └── contexts/      # React contexts
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   └── backend/
│       ├── src/
│       │   ├── routes/        # API routes
│       │   ├── middleware/    # Hono middleware
│       │   ├── services/      # Business logic
│       │   ├── db/           # Database schemas
│       │   ├── types/        # API types
│       │   └── utils/        # Utility functions
│       ├── package.json
│       └── tsconfig.json
├── .eslintrc.js               # Shared ESLint config
├── .prettierrc               # Shared Prettier config
├── tsconfig.base.json        # Shared TypeScript config
└── package.json              # Root package with workspaces
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Testing framework

### Backend
- **Hono.js** - Web framework for Cloudflare Workers
- **TypeScript** - Type safety
- **Vitest** - Testing framework

## Development Workflow

1. **Write tests first** (TDD approach)
2. **Implement features** in small, testable increments
3. **Run tests** to ensure everything works
4. **Refactor** while keeping tests passing
5. **Commit** with conventional commit messages

## Scripts

### Root Level Scripts
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages
- `npm test` - Run all tests
- `npm run clean` - Clean all build artifacts

### Frontend Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run type-check` - Type check
- `npm test` - Run tests

### Backend Scripts
- `npm run dev` - Start Hono dev server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code
- `npm run type-check` - Type check
- `npm test` - Run tests

## API Endpoints

### Health Check
```
GET /health
```

### Posts
```
GET  /api/posts     # Get all posts
POST /api/posts     # Create a new post
```

## Contributing

See [AGENTS.md](./AGENTS.md) for detailed guidelines for agentic coding assistants.

## License

MIT