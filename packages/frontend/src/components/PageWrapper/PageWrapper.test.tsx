import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PageWrapper from './PageWrapper'

describe('PageWrapper', () => {
  it('renders children with background', () => {
    render(
      <PageWrapper bgColor="bg-blue-500">
        <h1>Test</h1>
      </PageWrapper>
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})