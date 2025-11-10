# API Reference

This document provides comprehensive API documentation for the Developer Blog Platform backend built with Hono.js.

## Base URL

- **Development**: `http://localhost:8787`
- **Production**: `https://your-api.your-domain.workers.dev`

## Authentication

The API supports optional GitHub OAuth authentication. Include the authorization header for authenticated requests:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

#### GET `/health`

Returns the API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-10T12:00:00Z",
  "version": "1.0.0"
}
```

---

### Posts

#### GET `/api/posts`

Retrieve all published blog posts with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Posts per page (default: 10, max: 100)
- `tag` (optional): Filter by tag
- `search` (optional): Search in title and content

**Example Request:**
```bash
GET /api/posts?page=1&limit=10&tag=javascript
```

**Response:**
```json
{
  "posts": [
    {
      "id": "1",
      "title": "Getting Started with React",
      "slug": "getting-started-with-react",
      "excerpt": "Learn the basics of React...",
      "content": "# Getting Started with React\n\n...",
      "author": {
        "id": "1",
        "name": "John Doe",
        "avatar": "https://github.com/johndoe.png"
      },
      "tags": ["react", "javascript", "tutorial"],
      "publishedAt": "2024-11-10T12:00:00Z",
      "updatedAt": "2024-11-10T12:00:00Z",
      "readingTime": 5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### GET `/api/posts/:slug`

Retrieve a specific blog post by slug.

**Parameters:**
- `slug`: Post slug (URL-friendly identifier)

**Response:**
```json
{
  "id": "1",
  "title": "Getting Started with React",
  "slug": "getting-started-with-react",
  "content": "# Getting Started with React\n\n...",
  "author": {
    "id": "1",
    "name": "John Doe",
    "avatar": "https://github.com/johndoe.png",
    "bio": "Full-stack developer"
  },
  "tags": ["react", "javascript", "tutorial"],
  "publishedAt": "2024-11-10T12:00:00Z",
  "updatedAt": "2024-11-10T12:00:00Z",
  "readingTime": 5,
  "views": 1250
}
```

#### POST `/api/posts`

Create a new blog post. **Requires authentication**.

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "# My New Post\n\nThis is the content...",
  "tags": ["javascript", "tutorial"],
  "published": false
}
```

**Response:**
```json
{
  "id": "2",
  "title": "My New Post",
  "slug": "my-new-post",
  "content": "# My New Post\n\nThis is the content...",
  "author": {
    "id": "1",
    "name": "John Doe"
  },
  "tags": ["javascript", "tutorial"],
  "published": false,
  "createdAt": "2024-11-10T12:00:00Z",
  "updatedAt": "2024-11-10T12:00:00Z"
}
```

#### PUT `/api/posts/:id`

Update an existing blog post. **Requires authentication and ownership**.

**Request Body:** (partial update supported)
```json
{
  "title": "Updated Post Title",
  "content": "Updated content...",
  "published": true
}
```

#### DELETE `/api/posts/:id`

Delete a blog post. **Requires authentication and ownership**.

**Response:**
```json
{
  "message": "Post deleted successfully"
}
```

---

### Tags

#### GET `/api/tags`

Retrieve all tags with post counts.

**Response:**
```json
{
  "tags": [
    {
      "name": "javascript",
      "count": 15
    },
    {
      "name": "react",
      "count": 8
    },
    {
      "name": "tutorial",
      "count": 12
    }
  ]
}
```

---

### Authors

#### GET `/api/authors`

Retrieve all authors.

**Response:**
```json
{
  "authors": [
    {
      "id": "1",
      "name": "John Doe",
      "avatar": "https://github.com/johndoe.png",
      "bio": "Full-stack developer",
      "website": "https://johndoe.com",
      "twitter": "johndoe",
      "github": "johndoe",
      "postCount": 15
    }
  ]
}
```

#### GET `/api/authors/:id`

Retrieve a specific author with their posts.

**Response:**
```json
{
  "id": "1",
  "name": "John Doe",
  "avatar": "https://github.com/johndoe.png",
  "bio": "Full-stack developer passionate about web technologies",
  "website": "https://johndoe.com",
  "social": {
    "twitter": "johndoe",
    "github": "johndoe",
    "linkedin": "johndoe"
  },
  "posts": [
    {
      "id": "1",
      "title": "Getting Started with React",
      "slug": "getting-started-with-react",
      "excerpt": "Learn the basics...",
      "publishedAt": "2024-11-10T12:00:00Z"
    }
  ],
  "stats": {
    "postCount": 15,
    "totalViews": 50000,
    "avgReadingTime": 7
  }
}
```

---

### Authentication

#### POST `/api/auth/github`

Initiate GitHub OAuth authentication.

**Response:**
```json
{
  "authUrl": "https://github.com/login/oauth/authorize?client_id=..."
}
```

#### POST `/api/auth/callback`

Handle GitHub OAuth callback.

**Request Body:**
```json
{
  "code": "github-oauth-code"
}
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://github.com/johndoe.png"
  },
  "token": "jwt-token"
}
```

#### GET `/api/auth/me`

Get current user information. **Requires authentication**.

**Response:**
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://github.com/johndoe.png",
  "role": "author",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### Search

#### GET `/api/search`

Search posts, tags, and authors.

**Query Parameters:**
- `q` (required): Search query
- `type` (optional): Filter by type (`posts`, `tags`, `authors`)
- `limit` (optional): Results limit (default: 10)

**Response:**
```json
{
  "query": "react",
  "results": {
    "posts": [
      {
        "id": "1",
        "title": "Getting Started with React",
        "slug": "getting-started-with-react",
        "excerpt": "Learn the basics...",
        "relevance": 0.95
      }
    ],
    "tags": [
      {
        "name": "react",
        "count": 8
      }
    ],
    "authors": []
  },
  "totalResults": 9
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": {
      "field": "title",
      "value": ""
    }
  }
}
```

### Error Codes

- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource conflict (e.g., duplicate slug)
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

---

## Rate Limiting

API endpoints are rate-limited:

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **Write operations**: 10 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1699632000
```

---

## Database Schema

### Posts Table
```sql
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  views INTEGER DEFAULT 0
);
```

### Authors Table
```sql
CREATE TABLE authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  website TEXT,
  github_id TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tags Table
```sql
CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Post_Tags Table
```sql
CREATE TABLE post_tags (
  post_id TEXT,
  tag_id TEXT,
  PRIMARY KEY (post_id, tag_id)
);
```

---

## SDK Usage

### JavaScript/TypeScript SDK

```typescript
import { BlogAPI } from './api-client';

const api = new BlogAPI({
  baseURL: 'https://your-api.workers.dev',
  apiKey: 'your-api-key' // optional
});

// Get all posts
const posts = await api.posts.list({
  page: 1,
  limit: 10,
  tag: 'javascript'
});

// Get specific post
const post = await api.posts.get('getting-started-with-react');

// Create new post (requires authentication)
const newPost = await api.posts.create({
  title: 'My New Post',
  content: '# Hello World',
  tags: ['tutorial']
});
```

---

**Next:** [Deployment Guide](./deployment.md)