import { useParams } from 'react-router-dom'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <PageWrapper bgColor="bg-purple-500">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog Post Title</h1>
          <p className="text-xl mb-2">Post ID: {id}</p>
          <div className="flex items-center gap-4 text-sm opacity-75">
            <span>Published on: January 1, 2024</span>
            <span>Author: John Doe</span>
            <span>Reading time: 5 min</span>
          </div>
        </header>

        <div className="bg-white/10 p-8 rounded-lg">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              This is the beginning of your blog post content. Here you can share your thoughts,
              experiences, and insights with your readers.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Section Heading</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <blockquote className="border-l-4 border-white/30 pl-4 italic my-6">
              "This is a quote that highlights an important point in the blog post."
            </blockquote>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <footer className="mt-8 flex gap-4">
          <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
            ← Previous Post
          </button>
          <button className="border border-white text-white px-4 py-2 rounded hover:bg-white/10 transition-colors">
            Next Post →
          </button>
        </footer>
      </article>
    </PageWrapper>
  )
}

export default BlogDetail