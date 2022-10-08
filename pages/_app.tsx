import '../styles/globals.css';
import '../styles/submit.css';
import '../styles/post.css';
import '../styles/videoMobile.css';
import '../components/user/user-page.css';
import { UserContextProvider } from '../components/auth/UserContext';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { AuthModalContextProvider } from '../components/auth/modal/AuthModalContext';
import { CommunityContextProvider } from '../components/community/CommunityContext';
import { TimeMsgContextProvider } from '../components/main/TimeMsgContext';
import { GoogleOAuthProvider } from '../components/auth/providers/google/GoogleOAuthProvider';
import Layout from '../app/Layout';
import { useEffect } from 'react';
interface App {
  session: SessionProps
  error: string
}

const MyApp = ({Component, pageProps: { session, error, ...pageProps }}: AppProps<App>) => {

  useEffect(() => {
    const tracker = async () => {
      if (session?.user?.role === 1) return;
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return;
      try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${server}/user/analytics`
        const res = await fetch(url, {
          method: 'get',
          credentials: 'include'
        })
      } catch (err) {
        
      }
    }
    tracker();
  }, [])

  return (
    <UserContextProvider session={ session }>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        <AuthModalContextProvider>
          <CommunityContextProvider>
            <TimeMsgContextProvider>
                <Layout error={error}>
                  <Component {...pageProps} />
                </Layout>
            </TimeMsgContextProvider>
          </CommunityContextProvider>
        </AuthModalContextProvider>
      </GoogleOAuthProvider>
    </UserContextProvider>
  )
}

export default MyApp;

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (process.env.NODE_ENV === 'development') return;
  //telegramapis.sendLog(`${metric.name} : ${metric.value} start: ${metric.startTime}`)
}