import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
            {/* {process.env.NEXT_PUBLIC_NODE_ENV === 'production' &&
                <script
                    async
                    onError={(e) => {console.log("Adsense failed to load", e)}}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7203519143982992"
                    crossOrigin="anonymous"
                />
            } */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;