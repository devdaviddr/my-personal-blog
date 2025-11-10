import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const BlogPage = () => {
  return (
    <PageWrapper bgColor="bg-background">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Blog</h1>
      <p className="text-muted">Read the latest blog posts</p>
    </PageWrapper>
  )
}

export default BlogPage