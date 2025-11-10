import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const HomePage = () => {
  return (
    <PageWrapper bgColor="bg-background">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Home</h1>
      <p className="text-muted">Welcome to the Developer Blog Platform</p>
    </PageWrapper>
  )
}

export default HomePage