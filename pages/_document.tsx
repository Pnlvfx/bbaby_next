import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                {/* <script
                    async
                    onError={(e) => {console.log("Adsense failed to load", e)}}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7203519143982992"
                    crossOrigin="anonymous"
                    onLoad={(e) => {
                        console.log(e.target)
                    }}
                /> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;