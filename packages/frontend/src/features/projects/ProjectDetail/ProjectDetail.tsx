import { useParams, Link } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { fetchProjectById } from '../../../lib/api'
import { getReadingTime } from '../../../lib/markdown'
import PageWrapper from '../../../components/ui/PageWrapper/PageWrapper'
import Skeleton from '../../../components/ui/Loading/Skeleton'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()

  const { data: project, isLoading, error } = useFetchData(
    () => fetchProjectById(id!),
    {
      enabled: !!id,
    }
  )

  if (isLoading) {
    return (
      <PageWrapper bgColor="bg-background">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Skeleton className="h-12 w-4/5 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </header>

          <div className="bg-white/10 p-8 rounded-lg border border-muted/20">
            <Skeleton lines={8} />
          </div>
        </article>
      </PageWrapper>
    )
  }

  if (error || !project) {
    return (
      <PageWrapper bgColor="bg-background">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4 text-accent">
            {error ? 'Failed to load project' : 'Project not found'}
          </h1>
          <p className="text-muted mb-6">
            {error ? 'Please try again later.' : 'The requested project could not be found.'}
          </p>
          <Link
            to="/projects"
            className="inline-block bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </PageWrapper>
    )
  }

  const readingTime = getReadingTime(project.content)

  return (
    <PageWrapper bgColor="bg-background">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{project.frontmatter.title}</h1>

          {project.frontmatter.description && (
            <p className="text-xl text-muted mb-4">{project.frontmatter.description}</p>
          )}

          <div className="flex items-center gap-6 text-sm text-muted border-b border-muted/20 pb-4">
            <span>Created {new Date(project.frontmatter.date).toLocaleDateString()}</span>
            {project.frontmatter.author && <span>By {project.frontmatter.author}</span>}
            <span>{readingTime} min read</span>
          </div>

          {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {project.frontmatter.tags.map((tag: string) => (
                <span key={tag} className="bg-muted/20 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-lg prose-invert max-w-none bg-white/5 p-8 rounded-lg border border-muted/20"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />

        <footer className="mt-12 flex gap-4 justify-between items-center border-t border-muted/20 pt-8">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            ← Back to Projects
          </Link>

          {project.frontmatter.demo && (
            <a
              href={project.frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
            >
              View Demo →
            </a>
          )}
        </footer>
      </article>
    </PageWrapper>
  )
}

export default ProjectDetail