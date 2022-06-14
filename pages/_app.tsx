import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import AuthModalContext from '../components/auth/AuthModalContext';
import {useState,useEffect} from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import {CommunityContextProvider} from '../components/community/CommunityContext';
import {GoogleOAuthProvider} from '@react-oauth/google'
import UserContext from '../components/auth/UserContext';
import Head from 'next/head';

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
      router.events.on('routeChangeComplete', handleRouteChange)
      router.events.on('hashChangeComplete',handleRouteChange)
      return()=> {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  },[router.events])

  const [showAuthModal,setShowAuthModal] = useState(false);



  return (
    <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
    <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1.0, maximum-scale=1.0' />
        <meta name="referrer" content="origin-when-cross-origin" />
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
      </Head>
    <UserContext.Provider value={{session: session}}>
      <AuthModalContext.Provider value={{show:showAuthModal,setShow:setShowAuthModal}}>
        <GoogleOAuthProvider clientId='527300585899-mh0q9kh2fpijep43k37oriuafsl8m9hi.apps.googleusercontent.com'>
          <CommunityContextProvider>
              <Component {...pageProps}/>
         </CommunityContextProvider>
        </GoogleOAuthProvider>
      </AuthModalContext.Provider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp

export function reportWebVitals(metric: NextWebVitalsMetric) {
  metric.label === "web-vital" && console.log(metric);
}