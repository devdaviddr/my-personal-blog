import React from 'react'

interface SkillTagProps {
  children: React.ReactNode
  className?: string
}

const SkillTag: React.FC<SkillTagProps> = ({ children, className = '' }) => {
  return (
    <span className={`bg-muted/20 px-3 py-1 rounded-full text-sm ${className}`}>
      {children}
    </span>
  )
}

export default SkillTag