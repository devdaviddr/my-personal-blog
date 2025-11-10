interface PageWrapperProps {
  bgColor: string
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ bgColor, children }) => {
  return (
    <div className={`w-full ${bgColor} py-12 px-4`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}

export default PageWrapper