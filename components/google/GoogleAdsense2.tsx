import Script from "next/script"
const GoogleAdsense2 = () => {
  return (
    <div className="w-full h-full">
        <Script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7203519143982992"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
        <ins className="adsbygoogle"
            style={{display: "block"}}
            data-ad-client="ca-pub-7203519143982992"
            data-ad-slot="8491726081"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
            <Script id="googlePush">
            (adsbygoogle = window.adsbygoogle || []).push({});
            </Script>
    </div>
  )
}

export default GoogleAdsense2;