import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, type Mock } from 'vitest'
import BlogDetail from './BlogDetail'

// Mock useParams to return the desired ID
const mockUseParams = vi.fn() as Mock

// Mock useFetchData hook
const mockUseFetchData = vi.fn() as Mock

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as Record<string, unknown>
  return {
    ...actual,
    useParams: () => mockUseParams(),
  }
})

vi.mock('../../../hooks/useFetchData', () => ({
  useFetchData: () => mockUseFetchData(),
}))

describe('BlogDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading state', () => {
    mockUseParams.mockReturnValue({ id: '789' })
    mockUseFetchData.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    // Should show skeleton loading
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('should render error state', () => {
    mockUseParams.mockReturnValue({ id: '789' })
    mockUseFetchData.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Failed to load blog post')).toBeInTheDocument()
    expect(screen.getByText('Please try again later.')).toBeInTheDocument()
  })

  it('should render blog detail page with correct ID', () => {
    const mockPost = {
      id: '789',
      title: 'Blog Post Title',
      content: 'This is the beginning of your blog post content.',
      publishedAt: '2024-01-01',
      author: 'John Doe',
      readTime: 5,
    }

    mockUseParams.mockReturnValue({ id: '789' })
    mockUseFetchData.mockReturnValue({
      data: mockPost,
      isLoading: false,
      error: null,
    })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('Post ID: 789')).toBeInTheDocument()
    expect(screen.getByText('Published on: 01/01/2024')).toBeInTheDocument()
    expect(screen.getByText('Author: John Doe')).toBeInTheDocument()
    expect(screen.getByText('Reading time: 5 min')).toBeInTheDocument()
  })

  it('should render blog content sections', () => {
    const mockPost = {
      id: '789',
      title: 'Blog Post Title',
      content: 'This is the beginning of your blog post content.',
      publishedAt: '2024-01-01',
      author: 'John Doe',
      readTime: 5,
    }

    mockUseParams.mockReturnValue({ id: '789' })
    mockUseFetchData.mockReturnValue({
      data: mockPost,
      isLoading: false,
      error: null,
    })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Section Heading')).toBeInTheDocument()
    expect(screen.getByText('← Previous Post')).toBeInTheDocument()
    expect(screen.getByText('Next Post →')).toBeInTheDocument()
  })

  it('should render with different blog ID', () => {
    const mockPost = {
      id: '101',
      title: 'Blog Post Title',
      content: 'This is the beginning of your blog post content.',
      publishedAt: '2024-01-01',
      author: 'John Doe',
      readTime: 5,
    }

    mockUseParams.mockReturnValue({ id: '101' })
    mockUseFetchData.mockReturnValue({
      data: mockPost,
      isLoading: false,
      error: null,
    })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Post ID: 101')).toBeInTheDocument()
  })

  it('should render not found state when no post data', () => {
    mockUseParams.mockReturnValue({ id: '789' })
    mockUseFetchData.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Blog post not found')).toBeInTheDocument()
    expect(screen.getByText('The requested blog post could not be found.')).toBeInTheDocument()
  })
})