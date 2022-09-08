import { useEffect, useRef } from "react";
import telegramapis from "../utils/telegramapis";

const GoogleAdsense = () => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === undefined) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (error) {
      
    }
  }, [])

  

  useEffect(() => {
    const ads = async () => {
      const status = adRef.current?.getAttribute('data-ad-status')
      if (!status) return;
      if (adRef.current?.getAttribute('data-ad-status') === 'unfilled') {
        adRef.current.style.display = 'none'
      }
      await telegramapis.sendLog(status);
    }
    ads();
  }, [])

  return (
    <>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{display: "block"}}
        data-ad-client="ca-pub-7203519143982992"
        data-ad-slot="8491726081"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </>
  )
}

export default GoogleAdsense;