import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('renders the header with navigation', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('projects')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
    expect(screen.getByText('contact')).toBeInTheDocument()
  })
})