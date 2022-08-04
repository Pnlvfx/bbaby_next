import '../styles/globals.css'
import Head from 'next/head';
import UserContext from '../components/auth/UserContext';
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { AuthModalContextProvider } from '../components/auth/AuthModalContext';
import {CommunityContextProvider} from '../components/community/CommunityContext';
import CookieConsent from '../components/utils/validation/CookieConsent';
import { TimeMsgContextProvider } from '../components/main/TimeMsgContext';
import * as gtag from '../lib/gtag'

const MyApp = ({ Component, pageProps: {session, ...pageProps}}: AppProps) => {
 
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
      {/* <Script 
        id='Adsense-id'
        data-ad-client='ca-pub-7203519143982992'
        async
        strategy="afterInteractive"
        onError={ (e) => { console.error('Script failed to load', e) }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous" /> */}
    <UserContext.Provider value={{session: session}}>
        <AuthModalContextProvider>
            <CommunityContextProvider>
              <TimeMsgContextProvider>
                <CookieConsent />
                <Component {...pageProps}/>
              </TimeMsgContextProvider>
          </CommunityContextProvider>
        </AuthModalContextProvider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp;

export function reportWebVitals(metric: NextWebVitalsMetric) {
  setTimeout(() => {
    gtag.analyticsWebVitals({id:metric.id,name:metric.name,label:metric.label,value:metric.value})
  },500)
}