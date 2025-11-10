import { Link } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { fetchPosts } from '../../../lib/api'
import PageWrapper from '../../../components/ui/PageWrapper/PageWrapper'
import Skeleton from '../../../components/ui/Loading/Skeleton'

const BlogPage = () => {
  const { data: posts, isLoading, error } = useFetchData(fetchPosts)

  if (isLoading) {
    return (
      <PageWrapper bgColor="bg-background">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Blog</h1>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <article key={i} className="border border-muted/20 rounded-lg p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </article>
          ))}
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper bgColor="bg-background">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Blog</h1>
        <p className="text-muted">Failed to load blog posts. Please try again later.</p>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper bgColor="bg-background">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Blog</h1>
      <p className="text-xl text-muted mb-8">Thoughts, insights, and tutorials from my development journey.</p>

      {posts && posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: any) => (
            <article key={post.slug} className="border border-muted/20 rounded-lg p-6 hover:border-muted/40 transition-colors">
              <h2 className="text-2xl font-semibold mb-3">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {post.frontmatter.title}
                </Link>
              </h2>

              {post.frontmatter.description && (
                <p className="text-muted mb-4 line-clamp-2">
                  {post.frontmatter.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted mb-4">
                <span>{new Date(post.frontmatter.date).toLocaleDateString()}</span>
                {post.frontmatter.author && <span>By {post.frontmatter.author}</span>}
              </div>

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.frontmatter.tags.slice(0, 3).map((tag: string) => (
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
          <p className="text-muted text-lg">No blog posts found.</p>
          <p className="text-muted">Check back later for new content!</p>
        </div>
      )}
    </PageWrapper>
  )
}

export default BlogPage