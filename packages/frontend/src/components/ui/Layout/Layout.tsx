import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout