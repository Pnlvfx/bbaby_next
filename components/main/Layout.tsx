import Header from '../header/Header';
import { lazy, Suspense } from 'react';
import UseGoogleOneTapLogin from '../auth/providers/google/hooks/useGoogleOneTapLogin';
import dynamic from 'next/dynamic';

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  const AuthModal = dynamic(() => import('../auth/modal/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../community/CommunityFormModal'))
  const TimeMsg = dynamic(() => import('./TimeMsg'));
  
  return (
    <>
    <div>
      <Header />
      {children}
        <AuthModal />
        <CommunityFormModal />
        <TimeMsg />
    </div>
    {/* {UseGoogleOneTapLogin({onSuccess: ((res) => console.log('ook'))})} */}
    </>
  )
}

export default Layout;