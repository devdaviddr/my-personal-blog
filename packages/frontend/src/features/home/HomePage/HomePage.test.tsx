import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders the home page', () => {
    render(<HomePage />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Welcome to the Developer Blog Platform')).toBeInTheDocument()
  })
})