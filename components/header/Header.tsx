import type { NextComponentType } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { buttonClass } from '../utils/Button'
import { useAuthModal } from '../auth/modal/AuthModalContext'
import ClickOutHandler from 'react-clickout-ts'
import UserMenu from './UserMenu'
import NotUserMenu from './NotUserMenu'
import Image from 'next/image'
import Logo from '../../public/logo40x40.png'
import { PlusIcon, TextLogo, UserIcon } from '../utils/SVG'
import { RiArrowDownSLine } from 'react-icons/ri'
import { TbBabyCarriage } from 'react-icons/tb'
import NotificationButton from '../notifications/NotificationButton'
import Home from './Home'
import SearchBar from './search/SearchBar'
import { useSession } from '../auth/UserContext'

const Header: NextComponentType = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { session } = useSession()

  const className = {
    buttonHeader: 'items-center justify-center hover:bg-reddit_dark-brightest h-[32px] w-[32px] flex',
    icon: 'h-[20px] w-[20px] text-[#D7DADC] leading-5 align-middle',
  }
  const authModal = useAuthModal()

  return (
    <header id="myHeader" className={`fixed left-0 right-0 top-0 z-30 inline-flex h-12 items-center bg-reddit_dark-brighter`}>
      <div className="box-border inline-flex h-full flex-grow items-center border-b border-reddit_border px-2 lg:px-5">
        <div className="inline-flex h-full flex-grow items-center">
          <Link href={'/'} aria-label="Home" className="inline-flex flex-row items-center">
            <Image src={Logo} alt="logo" width={32} height={32} className="mr-1 pl-0 lg:mr-2" />
            <TextLogo className="hidden lg:block" />
          </Link>
          {session?.user && !session?.device?.mobile && <Home />}
          <SearchBar />
          {session?.user && (
            <div id="user_icons" className="flex items-center space-x-2">
              {session?.user.role === 1 && (
                <span className="h-8">
                  <Link href={'/governance'} className={className.buttonHeader}>
                    <TbBabyCarriage className={className.icon} />
                  </Link>
                </span>
              )}
              <NotificationButton />
              <span className="ml-2 h-8">
                <Link aria-label="Create Post" className={className.buttonHeader} href={'/submit'}>
                  <PlusIcon className={className.icon} />
                </Link>
              </span>
            </div>
          )}
          {!session?.user && (
            <div className={`mx-2 hidden flex-none sm:block`}>
              <button className={`ml-4 mr-2 h-8 w-20 md:mr-4 md:w-24 ${buttonClass(true)}`} onClick={() => authModal.setShow('login')}>
                <p>Log In</p>
              </button>
              <button className={`h-8 w-20 md:w-24 ${buttonClass()}`} onClick={() => authModal.setShow('register')}>
                <p>Sign Up</p>
              </button>
            </div>
          )}
          <div id="user_dropdown" className="flex h-[44px] items-center lg:ml-2">
            <ClickOutHandler onClickOut={() => setShowDropdown(false)}>
              <button
                aria-expanded={showDropdown}
                aria-label="user_dropdown"
                aria-haspopup="true"
                id="USER_DROPDOWN"
                className={`${
                  !session && 'lg:w-[70px]'
                } flex min-h-[32px] items-center justify-center rounded-md border border-transparent py-[2px] hover:border-reddit_border`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {!session?.user && (
                  <span className="flex items-center">
                    <span className="flex items-center">
                      <UserIcon className="h-5 w-5 align-middle leading-5 text-reddit_text-darker" />
                    </span>
                  </span>
                )}
                {session?.user && (
                  <div className="mr-0 flex h-full items-center lg:mr-16">
                    <div className="ml-2 mr-1 h-5 w-5 border border-reddit_border">
                      <Image src={session.user.avatar} alt="User Icon" width={20} height={20} />
                    </div>
                    <span className="w-50 hidden px-1 text-sm font-semibold md:block">{session.user.username}</span>
                  </div>
                )}
                <RiArrowDownSLine className="h-5 w-5 align-middle text-[20px] leading-5 text-reddit_text-darker" />
              </button>
              {session?.user && showDropdown && <UserMenu showDropdown={showDropdown} setShowDropdown={setShowDropdown} />}
              {!session?.user && showDropdown && <NotUserMenu setShowDropdown={setShowDropdown} />}
            </ClickOutHandler>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
