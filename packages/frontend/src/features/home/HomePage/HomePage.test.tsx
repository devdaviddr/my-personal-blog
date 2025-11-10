import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect } from 'vitest'
import HomePage from './HomePage'

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('HomePage', () => {
  it('renders the home page with hero section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText("Hi, I'm John Doe")).toBeInTheDocument()
    expect(screen.getByText('Full Stack Developer & Tech Enthusiast')).toBeInTheDocument()
  })

  it('renders about section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Languages & Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Databases')).toBeInTheDocument()
    expect(screen.getByText('Tools & Technologies')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByRole('link', { name: /view my work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact me/i })).toBeInTheDocument()
  })
})