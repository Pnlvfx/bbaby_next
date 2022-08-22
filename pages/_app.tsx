import '../styles/globals.css';
import Head from 'next/head';
import UserContext from '../components/auth/UserContext';
import type { AppProps } from 'next/app';
import { AuthModalContextProvider } from '../components/auth/modal/AuthModalContext';
import { CommunityContextProvider } from '../components/community/CommunityContext';
import CookieConsent from '../components/utils/validation/CookieConsent';
import { TimeMsgContextProvider } from '../components/main/TimeMsgContext';
import GoogleAnalytics from '../components/google/GoogleAnalytics';

const MyApp = ({Component, pageProps: { session, ...pageProps }}: AppProps) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const production = process.env.NODE_ENV === 'production' ? true : false;
    
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <link rel='apple-touch-icon' sizes='57x57' href={`${hostname}/apple-touch-icon-57x57.png`} />
        <link rel='apple-touch-icon' sizes='72x72' href={`${hostname}/apple-touch-icon-72x72.png`} />
        <link rel='apple-touch-icon' sizes='76x76' href={`${hostname}/apple-touch-icon-76x76.png`} />
        <link rel='apple-touch-icon' sizes='114x114' href={`${hostname}/apple-touch-icon-114x114.png`} />
        <link rel='apple-touch-icon' sizes='120x120' href={`${hostname}/apple-touch-icon-120x120.png`} />
        <link rel='apple-touch-icon' sizes='144x144' href={`${hostname}/apple-touch-icon-144x144.png`} />
        <link rel='apple-touch-icon' sizes='152x152' href={`${hostname}/apple-touch-icon-152x152.png`} />
        <link rel='apple-touch-icon' sizes='180x180' href={`${hostname}/apple-touch-icon-180x180.png`} />
        <meta name="theme-color" content="#1a1a1b" />
        <link rel="icon" type='image/png' href="/favicon.ico" />
        <meta name="application-name" content="bbabystyle" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="bbabystyle" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="twitter:creator" content="@Bbabystyle" /> */}
         {/* <meta httpEquiv="Content-Security-Policy"
              content={`default-src 'self' https://extreme-ip-lookup.com https://*.google-analytics.com https://www.googletagmanager.com https://accounts.google.com ${server} https://apis.google.com 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: w3.org/svg/2000 https://*; child-src https://accounts.google.com;`}/> */}
      </Head>
      <UserContext.Provider value={{ session }}>
        <AuthModalContextProvider>
          <CommunityContextProvider>
            <TimeMsgContextProvider>
              <Component {...pageProps} />
              <CookieConsent />
              {production && <GoogleAnalytics />}
            </TimeMsgContextProvider>
          </CommunityContextProvider>
        </AuthModalContextProvider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp;

