import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export interface MarkdownFrontmatter {
  title: string
  date: string
  author?: string
  description?: string
  tags?: string[]
  published?: boolean
  [key: string]: any
}

export interface MarkdownFile {
  slug: string
  frontmatter: MarkdownFrontmatter
  content: string
  html: string
}

// Process markdown content to HTML
export async function processMarkdown(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown)
  return result.toString()
}

// Parse a markdown file with frontmatter
export async function parseMarkdownFile(content: string, slug: string): Promise<MarkdownFile> {
  const { data, content: markdownContent } = matter(content)

  const html = await processMarkdown(markdownContent)

  return {
    slug,
    frontmatter: data as MarkdownFrontmatter,
    content: markdownContent,
    html,
  }
}

// Extract slug from filename (remove .md extension and date prefix if present)
export function extractSlug(filename: string): string {
  const withoutExtension = filename.replace(/\.md$/, '')
  // Remove date prefix if present (format: YYYY-MM-DD-title)
  return withoutExtension.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Get reading time estimate (roughly 200 words per minute)
export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}