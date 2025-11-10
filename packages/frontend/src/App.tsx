import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ui/ErrorBoundary/ErrorBoundary'
import Layout from './components/ui/Layout/Layout'
import HomePage from './features/home/HomePage/HomePage'
import ProjectsPage from './features/projects/ProjectsPage/ProjectsPage'
import ProjectDetail from './features/projects/ProjectDetail/ProjectDetail'
import BlogPage from './features/blog/BlogPage/BlogPage'
import BlogDetail from './features/blog/BlogDetail/BlogDetail'
import ContactPage from './features/contact/ContactPage/ContactPage'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App