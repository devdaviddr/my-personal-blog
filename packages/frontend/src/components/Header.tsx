import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const activeSection = location.pathname.slice(1) || 'home'

  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent z-10">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-6">
          {[
            { name: 'home', path: '/' },
            { name: 'projects', path: '/projects' },
            { name: 'blog', path: '/blog' },
            { name: 'contact', path: '/contact' },
          ].map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`capitalize px-3 py-2 rounded ${
                  activeSection === name
                    ? 'text-white underline'
                    : 'text-white hover:underline'
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header