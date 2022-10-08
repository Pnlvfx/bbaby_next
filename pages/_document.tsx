import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang='en-US'>
            <Head>
                {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
                   <>
                    <meta name="twitter:creator" content="@Bbabystyle" />
                    <script>window.yaContextCb=window.yaContextCb||[]</script>
                    <script src="https://yandex.ru/ads/system/context.js" async></script>
                   </>
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;