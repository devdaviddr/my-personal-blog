import React from 'react'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-64 h-64'
  }

  const classes = `rounded-full object-cover shadow-lg ${sizeClasses[size]} ${className}`

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
    />
  )
}

export default Avatar