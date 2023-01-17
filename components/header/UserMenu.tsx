import { useContext } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { GiBabyFace } from 'react-icons/gi'
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext'
import Router from 'next/router'
import { useSession } from '../auth/UserContext'
import Link from 'next/link'
import { postRequestHeaders } from '../main/config'
import { HiOutlineLogout } from 'react-icons/hi'
import { catchErrorWithMessage } from '../API/common'
import { useMessage } from '../main/TimeMsgContext'

function UserMenu({ showDropdown, setShowDropdown }: any) {
  const { session } = useSession()
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const containerClass = 'hover:bg-reddit_dark-brightest cursor-pointer'
  const buttonClass = 'text-sm p-3 pl-12 font-bold'
  const message = useMessage()

  const logout = async () => {
    try {
      const url = `${server}/logout`
      const body = JSON.stringify({})
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: postRequestHeaders,
        credentials: 'include',
      })
      localStorage.removeItem('isLogged')
      Router.reload()
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  const { setShow: setShowCommunity } = useContext(CommunityContext) as CommunityContextProps

  return (
    <div
      className={'absolute right-0 top-[53px] z-10 overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter text-reddit_text'}
    >
      <div className="w-[280px]">
        <div className="p-4 pb-1">
          <span className="flex text-sm text-reddit_text-darker">
            <BiUserCircle className="h-6 w-6" />
            <p className="pt-[3px] pl-2 text-sm">My Stuff</p>
          </span>
        </div>
        <div id="button_no_icons">
          {session?.user?.role === 1 && (
            <Link
              href={`/governance`}
              onClick={() => {
                setShowDropdown(false)
              }}
            >
              <div className={containerClass}>
                <p className={buttonClass}>Governance</p>
              </div>
            </Link>
          )}
          <div className={containerClass}>
            <p className={buttonClass}>Online Status</p>
          </div>
          {session?.user && (
            <Link
              href={`/user/${session.user.username}`}
              onClick={() => {
                setShowDropdown(false)
              }}
            >
              <div className={containerClass}>
                <p className={buttonClass}>Profile</p>
              </div>
            </Link>
          )}
          <Link
            href={`/settings`}
            onClick={() => {
              setShowDropdown(false)
            }}
          >
            <div className={containerClass}>
              <p className={buttonClass}>User Settings</p>
            </div>
          </Link>
        </div>
        <hr className="my-3 mb-4 border-reddit_border" />
        <div id="buttons_with_icon">
          <div className={containerClass}>
            <div
              className={'flex p-[9px] pl-4'}
              onClick={() => {
                setShowCommunity(true)
                setShowDropdown(false)
              }}
            >
              <GiBabyFace className="mr-2 h-6 w-6" />
              <p className="mt-[2px] text-sm font-bold">Create a community</p>
            </div>
          </div>
          <div className={containerClass}>
            <Link
              href={'/policies/user-agreement'}
              target="_blank"
              onClick={() => {
                setShowDropdown(false)
              }}
            >
              <p className={buttonClass}>User Agreement</p>
            </Link>
          </div>
          <div className={containerClass}>
            <Link
              href={'/policies/privacy-policy'}
              target="_blank"
              onClick={() => {
                setShowDropdown(false)
              }}
            >
              <p className={buttonClass}>Privacy Policy</p>
            </Link>
          </div>
        </div>
        <hr className="my-3 mb-4 border-reddit_border" />
        <div className={containerClass}>
          <div
            onClick={() => {
              logout()
              setShowDropdown(!showDropdown)
            }}
            className={'flex p-[9px] pl-4'}
          >
            <HiOutlineLogout className="mr-2 h-6 w-6" />
            <p className="mt-[2px] text-sm font-bold">Log Out</p>
          </div>
        </div>
        <div>
          <p className="p-4 pt-3 text-xs text-reddit_text-darker">2022 Bbabystyle.Inc. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
