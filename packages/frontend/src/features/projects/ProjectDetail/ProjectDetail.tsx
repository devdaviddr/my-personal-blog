import { useParams } from 'react-router-dom'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <PageWrapper bgColor="bg-green-500">
      <h1 className="text-4xl font-bold mb-4">Project Details</h1>
      <p className="text-xl mb-4">Project ID: {id}</p>
      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Project Title</h2>
        <p className="mb-4">Detailed description of the project will go here.</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            View Live Demo
          </a>
          <a
            href="#"
            className="border border-white text-white px-4 py-2 rounded hover:bg-white/10 transition-colors"
          >
            View Source Code
          </a>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProjectDetail