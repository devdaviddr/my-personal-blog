import { describe, it, expect, vi } from 'vitest'
import { fetchPosts } from '../lib/api'

// Mock the content module
vi.mock('../lib/content', () => ({
  getArticles: vi.fn().mockResolvedValue([
    {
      slug: 'test-post',
      frontmatter: {
        title: 'Test Post',
        date: '2024-01-01',
        author: 'Test Author'
      },
      content: 'Test content',
      html: '<p>Test content</p>'
    }
  ])
}))

describe('API functions', () => {
  it('fetchPosts returns array of posts', async () => {
    const posts = await fetchPosts()
    expect(posts).toBeInstanceOf(Array)
    expect(posts[0]).toHaveProperty('slug')
    expect(posts[0]).toHaveProperty('frontmatter')
  })
})