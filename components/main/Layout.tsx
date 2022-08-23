import Header from '../header/Header';
import { lazy, Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  const AuthModal = lazy(() => import('../auth/modal/AuthModal'))
  const CommunityFormModal = lazy(() => import('../community/CommunityFormModal'))
  const TimeMsg = lazy(() => import('./TimeMsg'));
  
  return (
    <div>
      <Header />
      {children}
      <Suspense fallback={<div />}>
        <AuthModal />
        <CommunityFormModal />
        <TimeMsg />
      </Suspense>
    </div>
  )
}

export default Layout;