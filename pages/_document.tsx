import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' className=''>
      <Head>
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}