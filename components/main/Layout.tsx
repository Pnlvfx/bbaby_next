import Header from '../header/Header'
import dynamic from 'next/dynamic'
import TimeMsg from './TimeMsg'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  const AuthModal = dynamic(() => import('../auth/modal/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../community/CommunityFormModal'))
  
  return (
    <div>
        <Header />
        {children}
        <AuthModal />
        <CommunityFormModal />
        <TimeMsg />
    </div>
  )
}

export default Layout;