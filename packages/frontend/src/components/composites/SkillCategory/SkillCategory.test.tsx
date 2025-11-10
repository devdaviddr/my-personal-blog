import { render, screen } from '@testing-library/react'
import SkillCategory from './SkillCategory'

describe('SkillCategory', () => {
  it('renders title correctly', () => {
    render(<SkillCategory title="Languages" skills={['JavaScript', 'TypeScript']} />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })

  it('renders all skills as SkillTag components', () => {
    const skills = ['React', 'Vue', 'Angular']
    render(<SkillCategory title="Frameworks" skills={skills} />)

    skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    render(<SkillCategory title="Tools" skills={['Git']} className="custom-class" />)
    const container = screen.getByText('Tools').closest('div')
    expect(container).toHaveClass('custom-class')
  })

  it('has correct structure', () => {
    render(<SkillCategory title="Databases" skills={['PostgreSQL']} />)
    const title = screen.getByText('Databases')
    expect(title).toHaveClass('text-xl', 'font-semibold', 'mb-4')

    const skillsContainer = title.nextElementSibling
    expect(skillsContainer).toHaveClass('flex', 'flex-wrap', 'gap-2')
  })
})