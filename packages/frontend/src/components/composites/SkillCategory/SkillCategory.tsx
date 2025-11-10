import React from 'react'
import SkillTag from '../../ui/SkillTag/SkillTag'

interface SkillCategoryProps {
  title: string
  skills: string[]
  className?: string
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, className = '' }) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-4 text-accent">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill}>
            {skill}
          </SkillTag>
        ))}
      </div>
    </div>
  )
}

export default SkillCategory