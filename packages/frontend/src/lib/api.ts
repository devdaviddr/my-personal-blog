import { getArticles, getArticleBySlug, getProjects, getProjectBySlug, MarkdownFile } from './content'

// Articles API
export async function fetchPosts(): Promise<MarkdownFile[]> {
  return await getArticles()
}

export async function fetchPostById(id: string): Promise<MarkdownFile | null> {
  return await getArticleBySlug(id)
}

// Projects API
export async function fetchProjects(): Promise<MarkdownFile[]> {
  return await getProjects()
}

export async function fetchProjectById(id: string): Promise<MarkdownFile | null> {
  return await getProjectBySlug(id)
}