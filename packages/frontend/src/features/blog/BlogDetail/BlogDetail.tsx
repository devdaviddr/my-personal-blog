import { useParams } from 'react-router-dom'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <PageWrapper bgColor="bg-background">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Blog Post Title</h1>
          <p className="text-xl mb-2 text-muted">Post ID: {id}</p>
          <div className="flex items-center gap-4 text-sm opacity-75 text-muted">
            <span>Published on: January 1, 2024</span>
            <span>Author: John Doe</span>
            <span>Reading time: 5 min</span>
          </div>
        </header>

        <div className="bg-white/10 p-8 rounded-lg border border-muted/20">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6 text-muted">
              This is the beginning of your blog post content. Here you can share your thoughts,
              experiences, and insights with your readers.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-accent">Section Heading</h2>
            <p className="mb-4 text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <blockquote className="border-l-4 border-accent pl-4 italic my-6 text-muted">
              "This is a quote that highlights an important point in the blog post."
            </blockquote>

            <p className="text-muted">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <footer className="mt-8 flex gap-4">
          <button className="bg-background text-muted px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            ← Previous Post
          </button>
          <button className="border border-muted text-muted px-4 py-2 rounded hover:bg-muted/10 transition-colors">
            Next Post →
          </button>
        </footer>
      </article>
    </PageWrapper>
  )
}

export default BlogDetail