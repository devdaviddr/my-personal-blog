import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HeroSection from './HeroSection'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HeroSection', () => {
  it('renders main heading', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByText("Hi, I'm John Doe")).toBeInTheDocument()
  })

  it('renders subheading', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByText('Full Stack Developer & Tech Enthusiast')).toBeInTheDocument()
  })

  it('renders description text', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByText(/I create modern web applications/)).toBeInTheDocument()
  })

  it('renders View My Work button that links to projects', () => {
    renderWithRouter(<HeroSection />)
    const link = screen.getByRole('link', { name: /view my work/i })
    expect(link).toHaveAttribute('href', '/projects')
  })

  it('renders Contact Me button that links to contact', () => {
    renderWithRouter(<HeroSection />)
    const link = screen.getByRole('link', { name: /contact me/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('renders avatar with correct alt text', () => {
    renderWithRouter(<HeroSection />)
    const avatar = screen.getByAltText('John Doe - Full Stack Developer')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src')
  })

  it('has responsive grid layout', () => {
    renderWithRouter(<HeroSection />)
    const heading = screen.getByText("Hi, I'm John Doe")
    const section = heading.closest('section')
    expect(section).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-2')
  })
})