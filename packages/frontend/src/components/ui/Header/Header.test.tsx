import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('renders the header with navigation', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('projects')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
    expect(screen.getByText('contact')).toBeInTheDocument()
  })

  it('shows active navigation link based on current route', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <Header />
      </MemoryRouter>
    )

    const projectsLink = screen.getByText('projects')
    expect(projectsLink).toHaveClass('underline')
    expect(projectsLink).toHaveClass('underline-offset-4')
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Initially, mobile menu should not be visible (only desktop menu)
    const desktopMenu = screen.getByRole('list') // The ul with navigation
    expect(desktopMenu).toBeVisible()

    // Click mobile menu button
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)

    // After clicking, there should be two navigation lists (desktop + mobile)
    const navigationLists = screen.getAllByRole('list')
    expect(navigationLists).toHaveLength(2)
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)

    // Mobile menu should be open now
    const navigationLists = screen.getAllByRole('list')
    expect(navigationLists).toHaveLength(2)

    // Click a navigation link (should be the mobile version)
    const homeLinks = screen.getAllByText('home')
    expect(homeLinks).toHaveLength(2) // Desktop and mobile versions
    const mobileHomeLink = homeLinks[1] as Element // Second instance is mobile
    await user.click(mobileHomeLink)

    // After clicking, should only have desktop menu again
    const finalNavigationLists = screen.getAllByRole('list')
    expect(finalNavigationLists).toHaveLength(1)
  })

  it('renders social media links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const linkedinLink = screen.getByLabelText('LinkedIn')
    const githubLink = screen.getByLabelText('GitHub')

    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })
})