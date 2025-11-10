import { parseMarkdownFile, extractSlug, MarkdownFile } from './markdown'

// Re-export for convenience
export type { MarkdownFile }

// Import all markdown files from content directories
const articleModules = import.meta.glob('/content/articles/*.md', {
  as: 'raw',
  eager: true
})

const projectModules = import.meta.glob('/content/projects/*.md', {
  as: 'raw',
  eager: true
})

// Cache for processed content
let articlesCache: MarkdownFile[] | null = null
let projectsCache: MarkdownFile[] | null = null

// Process raw markdown modules into MarkdownFile objects
async function processModules(modules: Record<string, string>): Promise<MarkdownFile[]> {
  const results: MarkdownFile[] = []

  for (const [path, content] of Object.entries(modules)) {
    const filename = path.split('/').pop() || ''
    const slug = extractSlug(filename)

    try {
      const file = await parseMarkdownFile(content, slug)
      // Only include published content
      if (file.frontmatter.published !== false) {
        results.push(file)
      }
    } catch (error) {
      console.error(`Error processing ${path}:`, error)
    }
  }

  // Sort by date (newest first)
  return results.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

// Get all articles
export async function getArticles(): Promise<MarkdownFile[]> {
  if (!articlesCache) {
    articlesCache = await processModules(articleModules)
  }
  return articlesCache
}

// Get all projects
export async function getProjects(): Promise<MarkdownFile[]> {
  if (!projectsCache) {
    projectsCache = await processModules(projectModules)
  }
  return projectsCache
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<MarkdownFile | null> {
  const articles = await getArticles()
  return articles.find(article => article.slug === slug) || null
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<MarkdownFile | null> {
  const projects = await getProjects()
  return projects.find(project => project.slug === slug) || null
}

// Get articles by tag
export async function getArticlesByTag(tag: string): Promise<MarkdownFile[]> {
  const articles = await getArticles()
  return articles.filter(article =>
    article.frontmatter.tags?.includes(tag)
  )
}

// Search articles by title or content
export async function searchArticles(query: string): Promise<MarkdownFile[]> {
  const articles = await getArticles()
  const lowercaseQuery = query.toLowerCase()

  return articles.filter(article =>
    article.frontmatter.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.frontmatter.description?.toLowerCase().includes(lowercaseQuery)
  )
}