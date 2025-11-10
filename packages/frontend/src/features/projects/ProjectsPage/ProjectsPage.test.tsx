import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectsPage from './ProjectsPage'

describe('ProjectsPage', () => {
  it('renders the projects page', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Showcase your amazing projects here')).toBeInTheDocument()
  })
})