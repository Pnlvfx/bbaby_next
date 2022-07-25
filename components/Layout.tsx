import Header from './header/Header'
import dynamic from 'next/dynamic'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  const AuthModal = dynamic(() => import('./auth/AuthModal'))
  const CommunityFormModal = dynamic(() => import('./community/CommunityFormModal'))
  
  return (
    <div>
        <Header />
        <AuthModal />
        <CommunityFormModal />
        {children}
    </div>
  )
}

export default Layout;