import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, type Mock } from 'vitest'
import ProjectDetail from './ProjectDetail'

// Mock useParams to return the desired ID
const mockUseParams = vi.fn() as Mock

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as Record<string, unknown>
  return {
    ...actual,
    useParams: () => mockUseParams(),
  }
})

describe('ProjectDetail', () => {
  it('should render project detail page with correct ID', () => {
    mockUseParams.mockReturnValue({ id: '123' })

    render(
      <MemoryRouter>
        <ProjectDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Project Details')).toBeInTheDocument()
    expect(screen.getByText('Project ID: 123')).toBeInTheDocument()
    expect(screen.getByText('Project Title')).toBeInTheDocument()
    expect(screen.getByText('View Live Demo')).toBeInTheDocument()
    expect(screen.getByText('View Source Code')).toBeInTheDocument()
  })

  it('should render with different project ID', () => {
    mockUseParams.mockReturnValue({ id: '456' })

    render(
      <MemoryRouter>
        <ProjectDetail />
      </MemoryRouter>
    )

    expect(screen.getByText('Project ID: 456')).toBeInTheDocument()
  })
})