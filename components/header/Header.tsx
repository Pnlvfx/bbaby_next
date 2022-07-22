import { useContext } from 'react'
import {
  ChatIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useState } from 'react'
import Button from '../utils/Button'
import AuthModalContext from '../auth/AuthModalContext'
import ClickOutHandler from 'react-clickout-ts'
import { useRouter } from 'next/router'
import UserMenu from './UserMenu'
import NotUserMenu from './NotUserMenu'
import Image from 'next/image'
import UserContext from '../auth/UserContext'
import Logo from '../../public/logo.png'
import { TextLogo } from '../utils/SVG'
import { RiArrowDownSLine } from 'react-icons/ri'
import { TbBabyCarriage } from 'react-icons/tb'
import NotificationButton from '../notifications/NotificationButton'
import Home from './Home'

function Header() {
  const { session } = useContext(UserContext)
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchText, setSearchText] = useState('')

  function doSearch(ev: { preventDefault: () => void }) {
    ev.preventDefault()
    router.push('/search/' + encodeURIComponent(searchText))
  }

  const { setShow } = useContext(AuthModalContext)

  return (
    <header
      id="myHeader"
      className={
        'sticky top-0 z-30 border-b border-reddit_border bg-reddit_dark-brighter p-1'
      }
    >
      <div className="ml-0 flex lg:ml-2">
        <Link href={'/'}>
          <a
            className="flex"
            onClick={(event) => {
              event.preventDefault(), router.push('/')
            }}
          >
            <div className="relative mr-2 ml-0 h-[34px] w-[34px] self-center lg:ml-2">
              <Image src={Logo} alt="logo" layout="fill" />
            </div>
            <div className="hidden self-center lg:block">
              <TextLogo />
            </div>
          </a>
        </Link>
        <Home />
        <form
          onSubmit={doSearch}
          className="mt-[2px] flex h-[38px] flex-none flex-grow self-center overflow-hidden rounded-sm border border-reddit_border bg-reddit_dark-brightest pl-3 text-reddit_text-darker 2xl:ml-64 2xl:mr-64"
        >
          <SearchIcon className="h-5 w-5 flex-none self-center" />
          <input
            type="text"
            className="w-full bg-reddit_dark-brightest p-1 pl-2 text-sm text-reddit_text placeholder:text-sm placeholder:text-reddit_text-darker focus:outline-none"
            placeholder="Search Bbaby"
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
          />
        </form>
        {session && (
          <div className="flex self-center px-2">
            <button className=" hidden">
              <ChatIcon className="mx-2 h-[25px] w-[25px] text-[#D7DADC]" />
            </button>
            <NotificationButton />
            {session.user.role === 1 && (
              <Link href={'/governance'}>
                <a className="self-center px-2">
                  <TbBabyCarriage className="block h-[25px] w-[25px] self-center text-[#D7DADC]" />
                </a>
              </Link>
            )}
            <Link href={'/submit'}>
              <a className="hidden self-center px-2 md:block">
                <PlusIcon className="h-[25px] w-[25px] self-center text-[#D7DADC]" />
              </a>
            </Link>
          </div>
        )}

        {!session && (
          <div className="mx-2 hidden flex-none self-center sm:block">
            <Button
              outline={1}
              className="ml-4 mr-2 h-8 w-20 md:mr-4 md:w-24"
              onClick={() => setShow('login')}
            >
              <p className="self-center">Log In</p>
            </Button>
            <Button
              className="h-8 w-20 md:w-24"
              onClick={() => setShow('register')}
            >
              <p>Sign Up</p>
            </Button>
          </div>
        )}
        <div className="self-center">
          <ClickOutHandler onClickOut={() => setShowDropdown(false)}>
            <div
              className="ml-0 flex cursor-pointer self-center lg:ml-4"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {!session && (
                <div className="m-1 h-6 w-6 self-center rounded-full">
                  <UserIcon className="text-reddit_text-darker" />
                </div>
              )}
              {session && (
                <div className="mr-0 flex lg:mr-16">
                  <div className="relative h-6 w-6 self-center border border-reddit_border">
                    <Image
                      src={session.user.avatar}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="w-50 hidden self-center px-1 text-sm font-semibold md:block">
                    {session.user.username}
                  </span>
                </div>
              )}
              <RiArrowDownSLine className="mr-0 h-[22px] w-[22px] self-center text-reddit_text-darker lg:mr-[17px]" />
            </div>
            {session && (
              <UserMenu
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />
            )}
            {!session && (
              <NotUserMenu
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />
            )}
          </ClickOutHandler>
        </div>
      </div>
    </header>
  )
}

export default Header
