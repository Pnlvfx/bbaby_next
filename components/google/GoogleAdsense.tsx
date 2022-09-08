import { useEffect } from "react";

const GoogleAdsense = () => {
  useEffect(() => {
    if (typeof window === undefined) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (error) {
      
    }
  }, [])

  return (
    <>
      <ins className="adsbygoogle"
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