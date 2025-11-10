import PageWrapper from '../../../components/ui/PageWrapper/PageWrapper'
import HeroSection from '../../../components/sections/HeroSection/HeroSection'
import AboutSection from '../../../components/sections/AboutSection/AboutSection'

const HomePage = () => {
  return (
    <PageWrapper bgColor="bg-background">
      <HeroSection />
      <AboutSection />
    </PageWrapper>
  )
}

export default HomePage