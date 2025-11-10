import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import Avatar from '../../ui/Avatar/Avatar'
import profileImage from '../../../assets/profile2.jpg'

const HeroSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
      <div>
        <h1 className="text-5xl font-bold mb-4 text-foreground">
          Hi, I'm John Doe
        </h1>
        <h2 className="text-2xl text-accent mb-6">
          Full Stack Developer & Tech Enthusiast
        </h2>
        <p className="text-lg text-muted mb-8 max-w-lg">
          I create modern web applications and share my journey through writing.
          Passionate about clean code, user experience, and continuous learning.
        </p>
        <div className="flex gap-4">
          <Link to="/projects">
            <Button variant="primary" size="lg">
              View My Work
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
        <Avatar
          src={profileImage}
          alt="John Doe - Full Stack Developer"
          size="xl"
        />
      </div>
    </section>
  )
}

export default HeroSection