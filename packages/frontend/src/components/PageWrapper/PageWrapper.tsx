interface PageWrapperProps {
  bgColor: string
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ bgColor, children }) => {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${bgColor}`}>
      <div className="text-center">
        {children}
      </div>
    </div>
  )
}

export default PageWrapper