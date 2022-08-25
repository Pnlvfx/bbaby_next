import Header from '../header/Header';
import UseGoogleOneTapLogin from '../auth/providers/google/hooks/useGoogleOneTapLogin';
import dynamic from 'next/dynamic';
import { googleLogin } from '../auth/providers/google/hooks/googleLogin';
import { useContext } from 'react';
import { AuthModalContext, AuthModalContextProps } from '../auth/modal/AuthModalContext';
import { useRouter } from 'next/router';
import { TimeMsgContext, TimeMsgContextProps } from './TimeMsgContext';
import UserContext from '../auth/UserContext';

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
  const AuthModal = dynamic(() => import('../auth/modal/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../community/CommunityFormModal'))
  const TimeMsg = dynamic(() => import('./TimeMsg'));
  const hosted_domain = process.env.NODE_ENV === 'production' ? 'www.bbabystyle.com' : undefined;
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const router = useRouter();
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const {session} = useContext(UserContext) as SessionProps;
  
  return (
    <>
    <div>
      <Header />
      {children}
        <AuthModal />
        <CommunityFormModal />
        <TimeMsg />
    </div>
    {!session && UseGoogleOneTapLogin({
      onSuccess: ((response) => googleLogin(response, modalContext, router, message)),
      cancel_on_tap_outside: false,
      hosted_domain
      })}
    </>
  )
}

export default Layout;