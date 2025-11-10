import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('renders with correct src and alt', () => {
    render(<Avatar src="/avatar.jpg" alt="Profile picture" />)
    const img = screen.getByAltText('Profile picture')
    expect(img).toHaveAttribute('src', '/avatar.jpg')
  })

  it('applies medium size by default', () => {
    render(<Avatar src="/avatar.jpg" alt="Profile" />)
    const img = screen.getByAltText('Profile')
    expect(img).toHaveClass('w-24', 'h-24')
  })

  it('applies different sizes', () => {
    const { rerender } = render(<Avatar src="/avatar.jpg" alt="Profile" size="sm" />)
    expect(screen.getByAltText('Profile')).toHaveClass('w-12', 'h-12')

    rerender(<Avatar src="/avatar.jpg" alt="Profile" size="lg" />)
    expect(screen.getByAltText('Profile')).toHaveClass('w-32', 'h-32')

    rerender(<Avatar src="/avatar.jpg" alt="Profile" size="xl" />)
    expect(screen.getByAltText('Profile')).toHaveClass('w-64', 'h-64')
  })

  it('applies custom className', () => {
    render(<Avatar src="/avatar.jpg" alt="Profile" className="custom-class" />)
    expect(screen.getByAltText('Profile')).toHaveClass('custom-class')
  })

  it('has rounded styling and shadow', () => {
    render(<Avatar src="/avatar.jpg" alt="Profile" />)
    const img = screen.getByAltText('Profile')
    expect(img).toHaveClass('rounded-full', 'object-cover', 'shadow-lg')
  })
})