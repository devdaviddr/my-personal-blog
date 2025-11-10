# Contributing Guide

Thank you for your interest in contributing to the Developer Blog Platform! This guide will help you get started with contributing to this static site blog.

## 🤝 How to Contribute

We welcome contributions of all kinds:
- 🐛 Bug reports and fixes
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX improvements
- 🧪 Tests and test coverage
- 🔧 Performance optimizations
- ✍️ Content contributions (blog posts, project showcases)

## 📋 Before You Start

1. **Check existing issues** - Look for existing issues or discussions
2. **Create an issue** - For new features or major changes, create an issue first
3. **Fork the repository** - Create your own fork to work in
4. **Follow the guidelines** - Read and follow our coding standards

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/developer-blog-platform.git
   cd developer-blog-platform
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   ```

4. **Open in Browser**
   - The site will be available at http://localhost:5173

## 📝 Coding Standards

### Code Style

We use the following tools to maintain code quality:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety

#### Run Code Quality Checks

```bash
# Lint code
pnpm lint

# Type checking
pnpm type-check

# Run tests
pnpm test
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
- `content`: Content additions/updates

#### Examples
```bash
feat(ui): add dark mode toggle
fix(blog): resolve markdown rendering issue
docs(readme): update installation instructions
content(blog): add react best practices post
test(components): add tests for header component
```

### Branch Naming

Use descriptive branch names:

```
type/short-description

# Examples
feat/dark-mode-toggle
fix/markdown-rendering
docs/update-readme
content/add-react-post
```

## 🏗️ Project Structure

```
packages/frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   ├── lib/                # Utilities and content processing
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Styling files
│   └── test/               # Test utilities
├── content/                # Markdown content
│   ├── articles/          # Blog posts
│   └── projects/          # Project showcases
├── docs/                  # Documentation
└── public/                # Static assets
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

#### Component Tests (React Testing Library)

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### Content Processing Tests

```typescript
// src/lib/__tests__/markdown.test.ts
import { processMarkdown, parseMarkdownFile } from '../markdown'

describe('markdown processing', () => {
  it('converts markdown to HTML', async () => {
    const markdown = '# Hello World'
    const html = await processMarkdown(markdown)
    expect(html).toContain('<h1>Hello World</h1>')
  })

  it('parses frontmatter correctly', async () => {
    const content = `---
title: Test Post
date: 2024-01-01
---

# Content here
`

    const result = await parseMarkdownFile(content, 'test')
    expect(result.frontmatter.title).toBe('Test Post')
    expect(result.slug).toBe('test')
  })
})
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
├── deployment.md           # Deployment guide
├── configuration.md        # Configuration options
├── contributing.md         # This file
├── examples/              # Code examples
└── troubleshooting.md     # Common issues
```

## ✍️ Content Contributions

### Writing Blog Posts

1. Create a new file in `content/articles/` with the format: `YYYY-MM-DD-your-post-title.md`

2. Add frontmatter and content:

```markdown
---
title: "Your Blog Post Title"
date: "2024-11-10"
author: "Your Name"
description: "Brief description of the post"
tags: ["tag1", "tag2"]
published: true
---

# Your Blog Post

Your content here. Supports **bold**, *italic*, [links](https://example.com), and more.

## Code Blocks

```javascript
function hello() {
  console.log('Hello, World!')
}
```

## Features

- Code syntax highlighting
- Responsive design
- SEO optimized
```

### Writing Project Showcases

1. Create a new file in `content/projects/` with your project name: `your-project-name.md`

2. Add project details:

```markdown
---
title: "My Awesome Project"
date: "2024-11-05"
author: "Your Name"
description: "Brief project description"
tags: ["react", "typescript"]
published: true
demo: "https://your-project-demo.com"
---

# Project Title

Project description, features, and details...
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

3. **Test your changes**
   ```bash
   pnpm test
   pnpm build
   pnpm preview
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feat/your-feature-name
   ```

6. **Fill out the PR template**

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
- [ ] Content addition

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed
- [ ] Build successful

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
- **User Experience** - Does it improve the user experience?
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
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
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
  )
}
```

### Content Processing

#### Markdown Processing

```typescript
// Good markdown processing
import { processMarkdown } from '@/lib/markdown'

export const BlogPost: React.FC<{ content: string }> = ({ content }) => {
  const [html, setHtml] = useState('')

  useEffect(() => {
    processMarkdown(content).then(setHtml)
  }, [content])

  return (
    <div
      className="prose prose-lg prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

### Error Handling

```typescript
// Good error handling
const BlogPage = () => {
  const { data: posts, isLoading, error } = useFetchData(fetchPosts)

  if (error) {
    return (
      <ErrorMessage>
        Failed to load blog posts. Please try again later.
      </ErrorMessage>
    )
  }

  // ... rest of component
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
- [ ] Content validated
- [ ] Build successful
- [ ] Version bumped
- [ ] Tagged and released

## 💬 Community

### Communication Channels

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
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