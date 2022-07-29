import Header from '../header/Header'
import dynamic from 'next/dynamic'
import TimeMsg from './TimeMsg'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  const AuthModal = dynamic(() => import('../auth/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../community/CommunityFormModal'))
  
  return (
    <div>
        <Header />
        <AuthModal />
        <CommunityFormModal />
        <TimeMsg />
        {children}
    </div>
  )
}

export default Layout;