import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'

describe('Layout', () => {
  it('renders the layout with header and outlet', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
    expect(screen.getByRole('banner')).toBeInTheDocument() // header
  })
})