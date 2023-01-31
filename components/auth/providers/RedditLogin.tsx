import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { server, siteUrl } from '../../main/config'
import { useMessage } from '../../main/TimeMsgContext'

const RedditLogin = (userInfo: UserProps) => {
  const { setMessage } = useMessage()
  const redditAccount = userInfo.hasExternalAccount ? userInfo.externalAccounts?.find((provider) => provider.provider === 'reddit') : undefined
  const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID
  const uri = siteUrl + '/settings' //reddit
  const router = useRouter()

  const redditLogin = () => {
    window.open(
      `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=bbabystyle&redirect_uri=${uri}&duration=permanent&scope=*`,
      '_self'
    )
  }

  const redditLogout = async () => {
    try {
      const res = await fetch(`${server}/reddit/logout`, {
        method: 'get',
        credentials: 'include',
      })
      if (res.ok) {
        router.reload()
      }
    } catch (err) {}
  }

  const getCredentials = async (code: string) => {
    try {
      const res = await fetch(`${server}/reddit/login?code=${code}`, {
        method: 'get',
        credentials: 'include',
      })
      if (res.ok) {
        window.location.href = '/settings'
      } else {
        setMessage({ value: 'Something went wrong!', status: 'error' })
      }
    } catch (err) {
      setMessage({ value: 'Something went wrong!', status: 'error' })
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    const { code } = router.query
    if (!code) return
    getCredentials(code.toString())
  }, [router])

  return (
    <div className="mt-7">
      {!redditAccount && (
        <>
          <div>
            <p>Connect to Reddit</p>
            <h2 className="pt-[2px] text-[11px] font-normal text-reddit_text-darker">
              Connect a Reddit account to enable the choiche to post your content on Reddit. We will never share to Reddit without your permission
            </h2>
          </div>
          <div className="mt-4 self-center">
            <button onClick={redditLogin} className="ml-auto flex rounded-full bg-reddit_orange px-4 py-[7px] text-sm font-bold">
              Connect to Reddit
            </button>
          </div>
        </>
      )}
      {redditAccount && (
        <>
          <div className="flex">
            <div>
              <p>Connected to Reddit</p>
              <h2 className="pt-[2px] text-[11px] font-normal text-reddit_text-darker">
                You can now choose to see your reddit feed from bbabystyle user-page
              </h2>
            </div>
            <div className="ml-auto self-center">
              <div className="ml-auto rounded-full px-4 py-[7px] text-xs">
                <p className="text-reddit_text-darker">@{redditAccount?.username}</p>
                <button
                  id="logout"
                  title="logout"
                  onClick={() => {
                    redditLogout()
                  }}
                >
                  <p className="mt-2 self-center text-center text-reddit_orange">(disconnect)</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RedditLogin
