import { Link } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { fetchProjects } from '../../../lib/api'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import Skeleton from '../../../components/Loading/Skeleton'

const ProjectsPage = () => {
  const { data: projects, isLoading, error } = useFetchData(fetchProjects)

  if (isLoading) {
    return (
      <PageWrapper bgColor="bg-background">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-muted/20 rounded-lg p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper bgColor="bg-background">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Projects</h1>
        <p className="text-muted">Failed to load projects. Please try again later.</p>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper bgColor="bg-background">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Projects</h1>
      <p className="text-xl text-muted mb-8">A showcase of my work and side projects.</p>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <article key={project.slug} className="border border-muted/20 rounded-lg p-6 hover:border-muted/40 transition-colors">
              <h2 className="text-xl font-semibold mb-3">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {project.frontmatter.title}
                </Link>
              </h2>

              {project.frontmatter.description && (
                <p className="text-muted mb-4 line-clamp-3">
                  {project.frontmatter.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted mb-4">
                <span>{new Date(project.frontmatter.date).toLocaleDateString()}</span>
              </div>

              {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.frontmatter.tags.slice(0, 4).map((tag: string) => (
                    <span key={tag} className="bg-muted/20 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg">No projects found.</p>
          <p className="text-muted">Check back later for new projects!</p>
        </div>
      )}
    </PageWrapper>
  )
}

export default ProjectsPage