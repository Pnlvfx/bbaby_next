import '../styles/globals.css';
import Head from 'next/head';
import UserContext from '../components/auth/UserContext';
import type { AppProps } from 'next/app';
import { AuthModalContextProvider } from '../components/auth/modal/AuthModalContext';
import { CommunityContextProvider } from '../components/community/CommunityContext';
import { TimeMsgContextProvider } from '../components/main/TimeMsgContext';
import GoogleAnalytics from '../components/google/GoogleAnalytics';
import { siteUrl } from '../components/main/config';
import { GoogleOAuthProvider } from '../components/auth/providers/google/GoogleOAuthProvider';
import Layout from '../components/main/Layout';
import { useEffect } from 'react';
import { GoogleAdsProvider } from '../components/google/GoogleAdsenseProvider';
interface AppPropsss {
  session: SessionProps['session']
}

const MyApp = ({Component, pageProps: { session, ...pageProps }}: AppProps<AppPropsss>) => {

  useEffect(() => {
    const tracker = async () => {
      if (session?.user.role === 1) return;
      try {
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return;
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const url = `${server}/user/analytics`
        const res = await fetch(url, {
          method: 'get',
          credentials: 'include'
        })
      } catch (err) {
        
      }
    }
    tracker();
  }, [session])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <link rel='apple-touch-icon' sizes='57x57' href={`${siteUrl}/apple-touch-icon-57x57.png`} />
        <link rel='apple-touch-icon' sizes='72x72' href={`${siteUrl}/apple-touch-icon-72x72.png`} />
        <link rel='apple-touch-icon' sizes='76x76' href={`${siteUrl}/apple-touch-icon-76x76.png`} />
        <link rel='apple-touch-icon' sizes='114x114' href={`${siteUrl}/apple-touch-icon-114x114.png`} />
        <link rel='apple-touch-icon' sizes='120x120' href={`${siteUrl}/apple-touch-icon-120x120.png`} />
        <link rel='apple-touch-icon' sizes='144x144' href={`${siteUrl}/apple-touch-icon-144x144.png`} />
        <link rel='apple-touch-icon' sizes='152x152' href={`${siteUrl}/apple-touch-icon-152x152.png`} />
        <link rel='apple-touch-icon' sizes='180x180' href={`${siteUrl}/apple-touch-icon-180x180.png`} />
        <meta name="theme-color" content="#1a1a1b" />
        <link rel="icon" type='image/png' href={`/favicon.ico`} />
        <meta name="application-name" content="bbabystyle" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="bbabystyle" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="twitter:creator" content="@Bbabystyle" /> */}
      </Head>
      <UserContext.Provider value={{ session }}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <AuthModalContextProvider>
            <CommunityContextProvider>
              <TimeMsgContextProvider>
                <GoogleAdsProvider>
                  <Layout>
                    <Component {...pageProps} />
                    {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && <GoogleAnalytics />}
                  </Layout>
                </GoogleAdsProvider>
              </TimeMsgContextProvider>
            </CommunityContextProvider>
          </AuthModalContextProvider>
        </GoogleOAuthProvider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp;
