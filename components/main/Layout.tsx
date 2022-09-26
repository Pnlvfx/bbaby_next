import Header from '../header/Header';
import UseGoogleOneTapLogin from '../auth/providers/google/hooks/useGoogleOneTapLogin';
import dynamic from 'next/dynamic';
import { googleLogin } from '../auth/providers/google/hooks/googleLogin';
import { ReactNode, useContext } from 'react';
import { AuthModalContext, AuthModalContextProps } from '../auth/modal/AuthModalContext';
import { useRouter } from 'next/router';
import { TimeMsgContext, TimeMsgContextProps } from './TimeMsgContext';
import { useSession } from '../auth/UserContext';
import CookieConsent from '../utils/validation/CookieConsent';
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext';
import GoogleAnalytics from '../google/GoogleAnalytics';
import Head from 'next/head';
import { siteUrl } from './config';

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children } : LayoutProps) => {
  const hosted_domain = process.env.NODE_ENV === 'production' ? '.bbabystyle.com' : undefined;
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const router = useRouter();
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const { session } = useSession();
  const communityContext = useContext(CommunityContext) as CommunityContextProps;
  const AuthModal = dynamic(() => import('../auth/modal/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../community/CommunityFormModal'))
  const TimeMsg = dynamic(() => import('./TimeMsg'));
  
  return (
    <>
    <Head>
      <meta name='yandex-verification' content='081e3ec3c7e3962f' key={'yandex'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <link rel='apple-touch-icon' sizes='57x57' href={`${siteUrl}/apple-touch-icon-57x57.png`} />
      <link rel='apple-touch-icon' sizes='72x72' href={`${siteUrl}/apple-touch-icon-72x72.png`} />
      <link rel='apple-touch-icon' sizes='76x76' href={`${siteUrl}/apple-touch-icon-76x76.png`} />
      <link rel='apple-touch-icon' sizes='114x114' href={`${siteUrl}/apple-touch-icon-114x114.png`} />
      <link rel='apple-touch-icon' sizes='120x120' href={`${siteUrl}/apple-touch-icon-120x120.png`} />
      <link rel='apple-touch-icon' sizes='144x144' href={`${siteUrl}/apple-touch-icon-144x144.png`} />
      <link rel='apple-touch-icon' sizes='152x152' href={`${siteUrl}/apple-touch-icon-152x152.png`} />
      <link rel='apple-touch-icon' sizes='180x180' href={`${siteUrl}/apple-touch-icon-180x180.png`} />
      <link rel="icon" type='image/png' sizes='192x192' href={`/android-chrome-192x192.png`} />
      <link rel="icon" type='image/png' sizes='32x32' href={`/favicon-32x32.png`} />
      <link rel="icon" type='image/png' sizes='16x16' href={`/favicon-16x16.png`} />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/mstile-150x150.png' />
      <meta name="theme-color" content="#1a1a1b" />
      <meta name="application-name" content="bbabystyle" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="bbabystyle" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* <meta name="twitter:creator" content="@Bbabystyle" /> */}
    </Head>
      <>
        <Header />
        <div className='pt-12'>
          <CookieConsent />
          {children}
        </div>
        {!session && modalContext.show !== 'hidden' &&  <AuthModal />}
        {session && communityContext.show && <CommunityFormModal />}
        {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && <GoogleAnalytics />}
        <TimeMsg />
      </>
      {!session && !router.pathname.match('/policies') && !router.pathname.match('/login') &&
      UseGoogleOneTapLogin({
        onSuccess: ((response) => googleLogin(response, modalContext, router, message)),
        cancel_on_tap_outside: false,
      })}
    </>
  )
}

export default Layout;