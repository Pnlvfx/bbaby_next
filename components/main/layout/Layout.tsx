import Header from '../../header/Header'
import UseGoogleOneTapLogin from '../../auth/providers/google/hooks/useGoogleOneTapLogin'
import dynamic from 'next/dynamic'
import { CSSProperties, ReactNode, useContext, useEffect } from 'react'
import { useAuthModal } from '../../auth/modal/AuthModalContext'
import { useRouter } from 'next/router'
import { useMessage } from '../TimeMsgContext'
import { useSession } from '../../auth/UserContext'
import CookieConsent from '../../utils/validation/cookie-consent/CookieConsent'
import { CommunityContext, CommunityContextProps } from '../../community/CommunityContext'
import GoogleAnalytics from '../../google/GoogleAnalytics'
import { CredentialResponse } from '../../../@types/google'
import { catchErrorWithMessage } from '../../API/common'
import oauthapis from '../../API/oauthapis'

interface LayoutProps {
  children: ReactNode
  error?: string
}

const Layout = ({ children, error }: LayoutProps) => {
  const authModal = useAuthModal()
  const router = useRouter()
  const message = useMessage()
  const { session } = useSession()
  const communityContext = useContext(CommunityContext) as CommunityContextProps
  const AuthModal = dynamic(() => import('../../auth/modal/AuthModal'))
  const CommunityFormModal = dynamic(() => import('../../community/CommunityFormModal'))
  const TimeMsg = dynamic(() => import('../TimeMsg'))

  const noHeader = router.pathname.match('login') || router.pathname.match('register') ? true : false

  const responseGoogle = async (response: CredentialResponse) => {
    try {
      await oauthapis.googleLogin(response)
      localStorage.setItem('isLogged', 'true')
      authModal.setShow('hidden')
      router.reload()
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  useEffect(() => {
    if (!error) return
    message.setMessage({ value: error, status: 'error', time: 20000 })
  }, [error])

  useEffect(() => {
    if (session?.user && authModal.show !== 'hidden') {
      router.reload()
    }
  }, [session])

  return (
    <>
      {!session?.user &&
        !router.pathname.match('/policies') &&
        !router.pathname.match('/login') &&
        !router.pathname.match('/register') &&
        UseGoogleOneTapLogin({
          onSuccess: (response) => responseGoogle(response),
          cancel_on_tap_outside: false,
        })}
      {!noHeader ? (
        <div id="container">
          <div
            className="main"
            style={
              {
                '--background': '#030303',
                '--canvas': '#030303',
              } as CSSProperties
            }
          >
            <div tabIndex={-1} />
            <div tabIndex={-1}>
              <div>
                <Header />
              </div>
              <div id="main_content" className="pt-12">
                <div>
                  <div className="flex min-h-[calc(100vh_-_48px)] flex-col">
                    <div className="z-3">
                      {!session?.eu_cookie && !process.env.NEXT_PUBLIC_CLIENT_URL.startsWith('http://192') && <CookieConsent />}
                      <div
                        onTouchEnd={(e) => {
                          router.push(router.pathname, undefined, { shallow: true })
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {session?.user && communityContext.show && <CommunityFormModal />}
            {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && <GoogleAnalytics />}
            <TimeMsg />
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
      {!session?.user && authModal.show !== 'hidden' && <AuthModal />}
    </>
  )
}

export default Layout
