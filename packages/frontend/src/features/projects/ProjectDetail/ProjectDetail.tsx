import { useParams } from 'react-router-dom'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <PageWrapper bgColor="bg-background">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Project Details</h1>
      <p className="text-xl mb-4 text-muted">Project ID: {id}</p>
      <div className="bg-white/10 p-6 rounded-lg border border-muted/20">
        <h2 className="text-2xl font-semibold mb-2 text-accent">Project Title</h2>
        <p className="mb-4 text-muted">Detailed description of the project will go here.</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="bg-accent text-foreground px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            View Live Demo
          </a>
          <a
            href="#"
            className="border border-muted text-muted px-4 py-2 rounded hover:bg-muted/10 transition-colors"
          >
            View Source Code
          </a>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProjectDetail