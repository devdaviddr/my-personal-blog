import { render, screen } from '@testing-library/react'
import SkillTag from './SkillTag'

describe('SkillTag', () => {
  it('renders children correctly', () => {
    render(<SkillTag>JavaScript</SkillTag>)
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('applies default styling', () => {
    render(<SkillTag>React</SkillTag>)
    const tag = screen.getByText('React')
    expect(tag).toHaveClass('bg-muted/20', 'px-3', 'py-1', 'rounded-full', 'text-sm')
  })

  it('applies custom className', () => {
    render(<SkillTag className="custom-class">Node.js</SkillTag>)
    expect(screen.getByText('Node.js')).toHaveClass('custom-class')
  })
})