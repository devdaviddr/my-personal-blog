import { render, screen } from '@testing-library/react'
import AboutSection from './AboutSection'

describe('AboutSection', () => {
  it('renders section title', () => {
    render(<AboutSection />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders about text content', () => {
    render(<AboutSection />)
    expect(screen.getByText(/I'm a passionate full-stack developer/)).toBeInTheDocument()
    expect(screen.getByText(/My journey in software development/)).toBeInTheDocument()
  })

  it('renders skill categories', () => {
    render(<AboutSection />)
    expect(screen.getByText('Languages & Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Databases')).toBeInTheDocument()
    expect(screen.getByText('Tools & Technologies')).toBeInTheDocument()
  })

  it('renders skills in each category', () => {
    render(<AboutSection />)

    // Languages & Frameworks
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()

    // Databases
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()

    // Tools
    expect(screen.getByText('Git')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  it('has responsive grid layout', () => {
    render(<AboutSection />)
    const grid = screen.getByText('About Me').closest('section')?.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'lg:grid-cols-3')
  })

  it('applies correct spacing and typography', () => {
    render(<AboutSection />)
    const title = screen.getByText('About Me')
    expect(title).toHaveClass('text-3xl', 'font-bold', 'mb-8')
  })
})