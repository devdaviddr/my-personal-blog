import { useParams } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import Skeleton from '../../../components/Loading/Skeleton'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()

  // Simulate fetching blog post data
  const { data: post, isLoading, error } = useFetchData(
    `/api/posts/${id}`,
    undefined,
    {
      enabled: !!id,
      // Mock data for demonstration
      initialData: {
        id: id || '1',
        title: 'Blog Post Title',
        content: 'This is the beginning of your blog post content. Here you can share your thoughts, experiences, and insights with your readers.',
        publishedAt: '2024-01-01',
        author: 'John Doe',
        readTime: 5
      }
    }
  )

  if (isLoading) {
    return (
      <PageWrapper bgColor="bg-background">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </header>

          <div className="bg-white/10 p-8 rounded-lg border border-muted/20">
            <Skeleton lines={6} />
          </div>
        </article>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper bgColor="bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-accent">Failed to load blog post</h1>
          <p className="text-muted">Please try again later.</p>
        </div>
      </PageWrapper>
    )
  }

  if (!post) {
    return (
      <PageWrapper bgColor="bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-accent">Blog post not found</h1>
          <p className="text-muted">The requested blog post could not be found.</p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper bgColor="bg-background">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
          <p className="text-xl mb-2 text-muted">Post ID: {post.id}</p>
          <div className="flex items-center gap-4 text-sm opacity-75 text-muted">
            <span>Published on: {new Date(post.publishedAt).toLocaleDateString()}</span>
            <span>Author: {post.author}</span>
            <span>Reading time: {post.readTime} min</span>
          </div>
        </header>

        <div className="bg-white/10 p-8 rounded-lg border border-muted/20">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6 text-muted">
              {post.content}
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