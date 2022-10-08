import Header from '../components/header/Header';
import UseGoogleOneTapLogin from '../components/auth/providers/google/hooks/useGoogleOneTapLogin';
import dynamic from 'next/dynamic';
import { googleLogin } from '../components/auth/providers/google/hooks/googleLogin';
import { CSSProperties, ReactNode, useContext, useEffect } from 'react';
import { AuthModalContext, AuthModalContextProps } from '../components/auth/modal/AuthModalContext';
import { useRouter } from 'next/router';
import { TimeMsgContext, TimeMsgContextProps } from '../components/main/TimeMsgContext';
import { useSession } from '../components/auth/UserContext';
import CookieConsent from '../components/utils/validation/cookie-consent/CookieConsent';
import { CommunityContext, CommunityContextProps } from '../components/community/CommunityContext';
import GoogleAnalytics from '../components/google/GoogleAnalytics';
import Head from 'next/head';
import { siteUrl } from '../components/main/config';

interface LayoutProps {
  children: ReactNode
  error: string
}

const Layout = ({ children, error } : LayoutProps) => {
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const router = useRouter();
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const { session } = useSession();
  const communityContext = useContext(CommunityContext) as CommunityContextProps;
  const AuthModal = dynamic(() => import('../components/auth/modal/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../components/community/CommunityFormModal'))
  const TimeMsg = dynamic(() => import('../components/main/TimeMsg'));

  useEffect(() => {
    if (!error) return;
    message.setMessage({value: error, status: 'error', time: 20000})
  }, [error])
  
  return (
    <>
      <Head>
        <meta name='yandex-verification' content='081e3ec3c7e3962f' key={'yandex'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <link rel='apple-touch-icon' sizes='57x57' href={`${siteUrl}/apple-touch-icon-57x57.png`} />
        <link rel='apple-touch-icon' sizes='60x60' href={`${siteUrl}/apple-icon-60x60.png`} />
        <link rel='apple-touch-icon' sizes='72x72' href={`${siteUrl}/apple-touch-icon-72x72.png`} />
        <link rel='apple-touch-icon' sizes='76x76' href={`${siteUrl}/apple-touch-icon-76x76.png`} />
        <link rel='apple-touch-icon' sizes='114x114' href={`${siteUrl}/apple-touch-icon-114x114.png`} />
        <link rel='apple-touch-icon' sizes='120x120' href={`${siteUrl}/apple-touch-icon-120x120.png`} />
        <link rel='apple-touch-icon' sizes='144x144' href={`${siteUrl}/apple-touch-icon-144x144.png`} />
        <link rel='apple-touch-icon' sizes='152x152' href={`${siteUrl}/apple-touch-icon-152x152.png`} />
        <link rel='apple-touch-icon' sizes='180x180' href={`${siteUrl}/apple-touch-icon-180x180.png`} />
        <link rel="icon" type='image/png' sizes='192x192' href={`${siteUrl}/android-chrome-192x192.png`} />
        <link rel="icon" type='image/png' sizes='32x32' href={`${siteUrl}/favicon-32x32.png`} />
        <link rel='icon' type='image/png' sizes='96x96' href={`${siteUrl}/android-icon-96x96.png`} />
        <link rel="icon" type='image/png' sizes='16x16' href={`${siteUrl}/favicon-16x16.png`} />
        <link rel='manifest' href={`${siteUrl}/manifest.json`} />
        <meta name='msapplication-TileColor' content='#030303' />
        <meta name='msapplication-TileImage' content={`${siteUrl}/mstile-150x150.png`} />
        <meta name="theme-color" content="#1a1a1b" />
        <meta name="application-name" content="bbabystyle" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="bbabystyle" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      {!session?.user 
        && !router.pathname.match('/policies') 
        && !router.pathname.match('/login') 
        && UseGoogleOneTapLogin({
          onSuccess: ((response) => googleLogin(response, modalContext, router, message)),
          cancel_on_tap_outside: false,
      })}
      <div id='container'>
        <div className='main' style={{'--background': '#030303', '--canvas': '#030303'} as CSSProperties}>
          <div tabIndex={-1} />
          <div className='' tabIndex={-1}>
            <div>
              <Header />
            </div>
          <div id='main_content' className='pt-12'>
            <div>
              <div className='flex flex-col min-h-[calc(100vh_-_48px)]'>
                <div className='z-3'>
                  {!session?.eu_cookie && (
                    <CookieConsent />
                  )}
                  {children}
                </div>
              </div>
            </div>
          </div>
          </div>
          {!session?.user && modalContext.show !== 'hidden' &&  <AuthModal />}
          {session?.user && communityContext.show && <CommunityFormModal />}
          {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && <GoogleAnalytics />}
          <TimeMsg />
        </div>
      </div>
    </>
  )
}

export default Layout;