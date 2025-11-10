import { useParams, Link } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { fetchPostById } from '../../../lib/api'
import { getReadingTime } from '../../../lib/markdown'
import PageWrapper from '../../../components/ui/PageWrapper/PageWrapper'
import Skeleton from '../../../components/ui/Loading/Skeleton'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()

  const { data: post, isLoading, error } = useFetchData(
    () => fetchPostById(id!),
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
              <Skeleton className="h-4 w-20" />
            </div>
          </header>

          <div className="bg-white/10 p-8 rounded-lg border border-muted/20">
            <Skeleton lines={8} />
          </div>
        </article>
      </PageWrapper>
    )
  }

  if (error || !post) {
    return (
      <PageWrapper bgColor="bg-background">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4 text-accent">
            {error ? 'Failed to load blog post' : 'Blog post not found'}
          </h1>
          <p className="text-muted mb-6">
            {error ? 'Please try again later.' : 'The requested blog post could not be found.'}
          </p>
          <Link
            to="/blog"
            className="inline-block bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </PageWrapper>
    )
  }

  const readingTime = getReadingTime(post.content)

  return (
    <PageWrapper bgColor="bg-background">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{post.frontmatter.title}</h1>

          {post.frontmatter.description && (
            <p className="text-xl text-muted mb-4">{post.frontmatter.description}</p>
          )}

          <div className="flex items-center gap-6 text-sm text-muted border-b border-muted/20 pb-4">
            <span>Published {new Date(post.frontmatter.date).toLocaleDateString()}</span>
            {post.frontmatter.author && <span>By {post.frontmatter.author}</span>}
            <span>{readingTime} min read</span>
          </div>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {post.frontmatter.tags.map((tag: string) => (
                <span key={tag} className="bg-muted/20 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-lg prose-invert max-w-none bg-white/5 p-8 rounded-lg border border-muted/20"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-12 flex gap-4 justify-between items-center border-t border-muted/20 pt-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            ← Back to Blog
          </Link>

          <div className="flex gap-4">
            <button className="bg-background text-muted px-4 py-2 rounded border border-muted/20 hover:bg-muted/10 transition-colors">
              Previous Post
            </button>
            <button className="border border-muted text-muted px-4 py-2 rounded hover:bg-muted/10 transition-colors">
              Next Post →
            </button>
          </div>
        </footer>
      </article>
    </PageWrapper>
  )
}

export default BlogDetail