import { useRouter } from "next/router"
import Script from "next/script"
import { useContext, useEffect } from "react"
import * as gtag from '../../lib/gtag'
import UserContext from "../auth/UserContext"

const GoogleAnalytics = () => {
  const provider = useContext(UserContext)
  const {session} = provider
  const router = useRouter()
  useEffect(() => { //GOOGLE ANALYTICS
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
      router.events.on('routeChangeComplete', handleRouteChange)
      router.events.on('hashChangeComplete',handleRouteChange)
      return()=> {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  },[router.events])

  useEffect(() => {
    if (!session) return
    gtag.user(session.user.username)
  },[session])

  return (
    <>
      <Script
          async
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        async
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname
            });
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics

export function useAppInit() {
  throw new Error('Function not implemented.')
}
