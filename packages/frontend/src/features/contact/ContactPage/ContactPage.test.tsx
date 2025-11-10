import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactPage from './ContactPage'

describe('ContactPage', () => {
  it('renders the contact page', () => {
    render(<ContactPage />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Get in touch with us')).toBeInTheDocument()
  })
})