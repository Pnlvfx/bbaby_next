import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const UserSettings = () => {
  const [active, setActive] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/account') {
      setActive(0)
    } else if (router.pathname.match('/profile')) {
      setActive(1)
    }
  },[router])

  return (
    <div>
      <h1 className="py-4 text-[19px] font-bold">User settings</h1>
      <div className="flex items-center space-x-5 mx-4">
        <button
          title="account"
          onClick={() => {
            router.push('/settings/account', undefined, { shallow: true })
          }}
          className={`py-2 ${active === 0 && 'border-b-[3px]'}`}
        >
          <p className={`text-sm font-bold ${active !== 0 && 'text-reddit_text-darker' }`}>Account</p>
        </button>
        <button
          title="account"
          onClick={() => {
            router.push('/settings/profile', undefined, { shallow: true })
          }}
          className={`py-2 ${active === 1 && 'border-b-[3px]'}`}
        >
          <p className={`text-sm font-bold ${active !== 1 && 'text-reddit_text-darker'}`}>Profile</p>
        </button>
        <button
          title="account"
          onClick={() => {
            router.push('/settings/profile', undefined, { shallow: true })
          }}
          className={`py-2 ${active === 2 && 'border-b-[3px]'}`}
        >
          <p className={`text-sm font-bold ${active !== 2 && 'text-reddit_text-darker'}`}>Safety & Privacy</p>
        </button>
      </div>
      <hr className="border-reddit_border" />
    </div>
  )
}

export default UserSettings;

