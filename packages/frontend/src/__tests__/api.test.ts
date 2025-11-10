import { describe, it, expect, vi } from 'vitest'

// Mock fetch
global.fetch = vi.fn()

describe('API Client', () => {
  it('should fetch posts from the API', async () => {
    const mockPosts = {
      posts: [
        {
          id: '1',
          title: 'Test Post',
          content: 'Test content',
          createdAt: '2023-01-01T00:00:00.000Z',
        },
      ],
    }

    ;(global.fetch as any).mockResolvedValueOnce({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ok: true,
      json: () => Promise.resolve(mockPosts),
    })

    // Import after mock
    const { fetchPosts } = await import('../lib/api')

    const posts = await fetchPosts()

    expect(global.fetch).toHaveBeenCalledWith('/api/posts')
    expect(posts).toEqual(mockPosts.posts)
  })
})