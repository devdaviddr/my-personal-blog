import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxios = vi.mocked(axios)

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

    ;(mockedAxios.get as any).mockResolvedValueOnce({ data: mockPosts })

    // Import after mock
    const { fetchPosts } = await import('../lib/api')

    const posts = await fetchPosts()

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/posts')
    expect(posts).toEqual(mockPosts.posts)
  })
})