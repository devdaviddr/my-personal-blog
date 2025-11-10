# Contributing Guide

Thank you for your interest in contributing to the Developer Blog Platform! This guide will help you get started with contributing to the project.

## 🤝 How to Contribute

We welcome contributions of all kinds:
- 🐛 Bug reports and fixes
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX improvements
- 🧪 Tests and test coverage
- 🔧 Performance optimizations

## 📋 Before You Start

1. **Check existing issues** - Look for existing issues or discussions
2. **Create an issue** - For new features or major changes, create an issue first
3. **Fork the repository** - Create your own fork to work in
4. **Follow the guidelines** - Read and follow our coding standards

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Cloudflare account (for testing deployment features)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/developer-blog-platform.git
   cd developer-blog-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd api && npm install && cd ..
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env.local
   cp api/.env.example api/.env.local
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - API
   cd api && npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

## 📝 Coding Standards

### Code Style

We use the following tools to maintain code quality:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Husky** - Git hooks for quality checks

#### Run Code Quality Checks

```bash
# Lint and format
npm run lint
npm run format

# Type checking
npm run type-check

# Run all checks
npm run check
```

### Commit Convention

We follow [Conventional Commits](https://conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples
```bash
feat(api): add post pagination endpoint
fix(ui): resolve dark mode toggle issue
docs(readme): update installation instructions
test(posts): add unit tests for post creation
```

### Branch Naming

Use descriptive branch names:

```
type/short-description

# Examples
feat/post-pagination
fix/dark-mode-toggle
docs/api-reference-update
refactor/auth-middleware
```

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Styling files
├── api/
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express/Hono middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   └── db/                 # Database schema and migrations
├── docs/                   # Documentation
├── tests/                  # Test files
└── public/                 # Static assets
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# API tests
cd api && npm test
```

### Writing Tests

#### Frontend Tests (React Testing Library)

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### API Tests (Hono Testing)

```typescript
// api/src/routes/__tests__/posts.test.ts
import { testClient } from 'hono/testing';
import { app } from '../posts';

describe('/api/posts', () => {
  const client = testClient(app);

  it('should return all posts', async () => {
    const res = await client.posts.$get();
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data).toHaveProperty('posts');
    expect(Array.isArray(data.posts)).toBe(true);
  });

  it('should create a new post', async () => {
    const postData = {
      title: 'Test Post',
      content: 'Test content',
      tags: ['test']
    };

    const res = await client.posts.$post({ json: postData });
    expect(res.status).toBe(201);
    
    const data = await res.json();
    expect(data.title).toBe(postData.title);
  });
});
```

### Test Database

For API tests, use a separate test database:

```bash
# Create test database
npx wrangler d1 create blog-db-test

# Update api/wrangler.toml with test environment
```

## 📚 Documentation

### Writing Documentation

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Update relevant documentation files
- Test all code examples

### Documentation Structure

```
docs/
├── getting-started.md      # Setup and installation
├── api-reference.md        # API documentation
├── deployment.md           # Deployment guide
├── configuration.md        # Configuration options
├── contributing.md         # This file
├── examples/              # Code examples
├── guides/                # How-to guides
└── troubleshooting.md     # Common issues
```

## 🔍 Code Review Process

### Submitting a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Write clear, tested code
   - Follow coding standards
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Fill out the PR template**

### PR Template

When creating a PR, use this template:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Criteria

PRs will be reviewed for:

- **Functionality** - Does it work as expected?
- **Code Quality** - Is it readable and maintainable?
- **Performance** - Any performance implications?
- **Security** - Any security considerations?
- **Tests** - Adequate test coverage?
- **Documentation** - Is documentation updated?

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Node.js version: [e.g., 18.17.0]
- Project version: [e.g., 1.2.3]

**Additional context**
Any other context about the problem.
```

## ✨ Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other context, mockups, or examples.
```

## 🔧 Development Guidelines

### Component Development

#### React Components

```typescript
// Good component structure
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### API Routes

```typescript
// Good route structure
import { Hono } from 'hono';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const app = new Hono();

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

app.post(
  '/posts',
  validate(createPostSchema),
  async (c) => {
    const data = c.req.valid('json');
    // Handle post creation
    return c.json({ success: true });
  }
);
```

### Database Migrations

```sql
-- migrations/001_create_posts_table.sql
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Always use IF NOT EXISTS for safety
-- Always provide default values where appropriate
-- Always create appropriate indexes
```

### Error Handling

```typescript
// Good error handling
try {
  const result = await riskyOperation();
  return c.json({ data: result });
} catch (error) {
  logger.error('Operation failed', { error: error.message });
  
  if (error instanceof ValidationError) {
    return c.json({ error: 'Invalid data' }, 400);
  }
  
  return c.json({ error: 'Internal server error' }, 500);
}
```

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0) - Breaking changes
- **Minor** (1.1.0) - New features, backward compatible
- **Patch** (1.1.1) - Bug fixes, backward compatible

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Tagged and released
- [ ] Deployment tested

## 💬 Community

### Communication Channels

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Real-time community chat
- **Twitter** - Updates and announcements

### Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## 🙏 Recognition

Contributors are recognized in:

- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub releases
- Social media shoutouts

---

**Thank you for contributing to the Developer Blog Platform!** 

Your contributions help make this project better for the entire developer community. If you have any questions, don't hesitate to reach out through our communication channels.

---

**Happy coding!** 🎉