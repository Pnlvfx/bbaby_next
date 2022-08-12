import Script from "next/script";

const GoogleAdsense = () => {
  return (
    <div>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-7203519143982992"
        async={true}
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Script failed to load', e)
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      />
    </div>
  )
}

export default GoogleAdsense;
