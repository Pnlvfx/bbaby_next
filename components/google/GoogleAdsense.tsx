import { useEffect, useRef } from 'react'

const GoogleAdsense = () => {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    if (typeof window === undefined) return
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (err) {}
  }, [])

  return (
    <>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7203519143982992"
        data-ad-slot="8491726081"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  )
}

export default GoogleAdsense
