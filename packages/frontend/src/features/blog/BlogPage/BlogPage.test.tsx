import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BlogPage from './BlogPage'

describe('BlogPage', () => {
  it('renders the blog page', () => {
    render(<BlogPage />)
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Read the latest blog posts')).toBeInTheDocument()
  })
})