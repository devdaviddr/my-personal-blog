import React from 'react'
import SkillCategory from '../../composites/SkillCategory/SkillCategory'

const AboutSection: React.FC = () => {
  const languagesAndFrameworks = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Next.js', 'Express.js'
  ]

  const databases = [
    'PostgreSQL', 'MongoDB', 'Redis', 'MySQL'
  ]

  const toolsAndTechnologies = [
    'Git', 'Docker', 'AWS', 'Vite', 'Tailwind CSS', 'Jest', 'Figma'
  ]

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-8 text-foreground">About Me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <p className="text-lg text-muted leading-relaxed mb-4">
            I'm a passionate full-stack developer with over 5 years of experience building
            modern web applications. I love working with cutting-edge technologies and
            sharing my knowledge through this blog.
          </p>
          <p className="text-lg text-muted leading-relaxed mb-4">
            My journey in software development started with a curiosity about how websites work,
            and it has evolved into a deep passion for creating efficient, scalable, and
            user-friendly applications. I believe in writing clean, maintainable code and
            staying up-to-date with the latest industry trends.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            When I'm not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing insights about development practices. This blog
            is where I document my learning journey and help others in their development paths.
          </p>
        </div>

        <div className="space-y-8">
          <SkillCategory
            title="Languages & Frameworks"
            skills={languagesAndFrameworks}
          />
          <SkillCategory
            title="Databases"
            skills={databases}
          />
          <SkillCategory
            title="Tools & Technologies"
            skills={toolsAndTechnologies}
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection