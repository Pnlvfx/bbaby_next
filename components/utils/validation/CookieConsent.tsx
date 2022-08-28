import Link from 'next/link';
import { useEffect, useState } from 'react';

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const domain = process.env.NODE_ENV === 'production' ? '.bbabystyle.com' : 'localhost'
  const acceptCookie = () => {
    const cookie = process.env.NEXT_PUBLIC_COOKIE_CONSENT_SECRET;
    document.cookie =
      `eu_cookie = ${encodeURI(cookie)}; domain = ${domain};  max-age =` + 30 * 98 * 100 * 600
    setShow(false)
  }

  const checkIfCookieExist = () => {
    const cookieArray = document.cookie.split(';')
    for (let i = 0; i < cookieArray.length; i++) {
      const cookiePair = cookieArray[i].split('=')
      if ('eu_cookie' == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1])
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const check = checkIfCookieExist();
      if (check === undefined) {
          setShow(true)
      }
    }, 30)
  }, [show])

  if (!show) return null;

  return (
    <div className={`${show ? 'block' : 'hidden'}`}>
      <div className="fixed bottom-0 z-30 flex w-full rounded-sm border border-reddit_border bg-reddit_dark-brighter font-bold lg:left-[35%] lg:right-[50%] lg:bottom-12 lg:w-[700px]">
        <div className={'w-6 bg-reddit_blue'} />
        <div>
          <p className="p-3 pl-4 text-[15px]">
            We use cookies on our website for a number of purposes, including
            analytics and performance, functionality and advertising.{' '}
            <Link href={'/policies/cookies'}>
              <a target={'_blank'} className="text-[#4BB3F3]">
                Learn more about Bbaby&apos;s use of cookies.
              </a>
            </Link>
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                acceptCookie()
              }}
              className="rounded-full bg-reddit_text p-2 px-3 text-sm font-bold"
            >
              <p className='text-reddit_dark'>Reject non-essential</p>
            </button>
            <button
              onClick={() => {
                acceptCookie()
              }}
              className="rounded-full bg-reddit_text p-2 px-3 text-sm font-bold"
            >
              <p className='text-reddit_dark'>Accept all</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent;

