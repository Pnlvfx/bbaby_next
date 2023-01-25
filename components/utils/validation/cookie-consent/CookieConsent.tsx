import Link from 'next/link'
import userapis from '../../../API/userapis'
import { useSession } from '../../../auth/UserContext'
import { CloseIcon } from '../../SVG'
import style from './cookie-consent.module.css'

const CookieConsent = () => {
  const { session, setSession } = useSession()

  const eu_cookie = async (status: boolean) => {
    try {
      const data = await userapis.saveEUcookie(status)
      setSession({ ...session, eu_cookie: data })
    } catch (err) {}
  }

  return (
    <>
      <div className={'hidden md:block'}>
        <div className={style.cookieContainer}>
          <section>
            <div
              className={`${style.cookieConsent}`}
              style={{
                opacity: 1,
                transform: 'translateY(0px) scale(1, 1)',
              }}
            >
              <section className="my-[6px] ml-[6px] flex flex-col items-center">
                <span className="mx-3 flex-1 text-[14px] leading-[21px]">
                  We use cookies on our website for a number of purposes, including analytics and performance, functionality and advertising.{' '}
                  <Link href={'/policies/cookies'} target={'_blank'} className="text-[#4BB3F3]">
                    Learn more about Bbaby&apos;s use of cookies.
                  </Link>
                </span>
                <section className="mt-3 flex items-center justify-between">
                  <button
                    className={`${style.cookieButtons} mr-3`}
                    role={'button'}
                    tabIndex={0}
                    onClick={() => {
                      eu_cookie(false)
                    }}
                  >
                    Reject non-essential
                  </button>
                  <button
                    className={style.cookieButtons}
                    onClick={() => {
                      eu_cookie(true)
                    }}
                  >
                    <p className="text-reddit_dark">Accept all</p>
                  </button>
                </section>
              </section>
            </div>
          </section>
        </div>
      </div>
      <div className="relative my-4 block rounded-[4px] border border-solid border-[#3a3a3c] bg-reddit_dark-brighter p-4 text-[0.875rem] md:hidden">
        <button
          name="close"
          aria-label="close cookie"
          className="absolute right-1 top-1 p-1"
          onClick={() => {
            eu_cookie(true)
          }}
        >
          <i className="inline-block align-middle leading-[1em]">
            <CloseIcon className="h-[1em] w-auto leading-4" />
          </i>
        </button>
        Cookies help us deliver out Services. we only use essential cookies.{' '}
        <Link href={'/policies/cookies'} target={'_blank'} className="text-reddit_blue">
          Cookie policy
        </Link>
      </div>
    </>
  )
}

export default CookieConsent
