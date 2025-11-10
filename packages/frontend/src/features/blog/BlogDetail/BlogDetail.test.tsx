import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, type Mock } from 'vitest'
import BlogDetail from './BlogDetail'

// Mock useParams to return the desired ID
const mockUseParams = vi.fn() as Mock

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as Record<string, unknown>
  return {
    ...actual,
    useParams: () => mockUseParams(),
  }
})

describe('BlogDetail', () => {
  it('should render blog detail page with correct ID', () => {
    mockUseParams.mockReturnValue({ id: '789' })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('Post ID: 789')).toBeInTheDocument()
    expect(screen.getByText('Published on: January 1, 2024')).toBeInTheDocument()
    expect(screen.getByText('Author: John Doe')).toBeInTheDocument()
    expect(screen.getByText('Reading time: 5 min')).toBeInTheDocument()
  })

  it('should render blog content sections', () => {
    mockUseParams.mockReturnValue({ id: '789' })

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
    mockUseParams.mockReturnValue({ id: '101' })

    render(
      <MemoryRouter>
        <BlogDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Post ID: 101')).toBeInTheDocument()
  })
})