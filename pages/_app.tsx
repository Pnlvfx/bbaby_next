import '../styles/globals.css'
import Head from 'next/head';
import UserContext from '../components/auth/UserContext';
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { AuthModalContextProvider } from '../components/auth/AuthModalContext';
import {CommunityContextProvider} from '../components/community/CommunityContext';
import CookieConsent from '../components/utils/validation/CookieConsent';
import { TimeMsgContextProvider } from '../components/main/TimeMsgContext';
import GoogleAdsense from '../components/google/GoogleAdsense';
import { useRouter } from 'next/router';
import { analyticsWebVitals } from '../lib/gtag';

const MyApp = ({ Component, pageProps: {session, ...pageProps}}: AppProps) => {
  const router = useRouter();
  const production = process.env.NODE_ENV === 'production' ? true : false
  const pathNotUsed = router.pathname.includes('activation') ? true : false
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1.0, maximum-scale=1.0' />
        {/* <meta httpEquiv="Content-Security-Policy"
              content={`default-src 'self' https://extreme-ip-lookup.com https://*.google-analytics.com https://www.googletagmanager.com https://accounts.google.com ${server} https://apis.google.com 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: w3.org/svg/2000 https://*; child-src https://accounts.google.com;`}/> */}
        <meta name="referrer" content="origin-when-cross-origin"/>
        <meta name="application-name" content="bbabystyle" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
              name="apple-mobile-web-app-status-bar-style"
              content="default"
            />
        <meta name="apple-mobile-web-app-title" content="bbabystyle" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:site_name" content="bbabystyle" />
        <meta name="twitter:creator" content="@Bbabystyle" />
        <meta name='theme-color' content='#1a1a1b' />
      </Head>
      <UserContext.Provider value={{session}}>
          <AuthModalContextProvider>
              <CommunityContextProvider>
                <TimeMsgContextProvider>
                  {production && !pathNotUsed && (
                    <>
                    <GoogleAdsense />
                    <CookieConsent />
                    </>
                  )}
                  <Component {...pageProps}/>
                </TimeMsgContextProvider>
            </CommunityContextProvider>
          </AuthModalContextProvider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp;

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  production && 
  analyticsWebVitals({id:metric.id,name:metric.name,label:metric.label,value:metric.value})
}