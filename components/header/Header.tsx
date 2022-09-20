import { useContext, useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { buttonClass } from '../utils/Button';
import {AuthModalContext, AuthModalContextProps} from '../auth/modal/AuthModalContext';
import ClickOutHandler from 'react-clickout-ts';
import UserMenu from './UserMenu';
import NotUserMenu from './NotUserMenu';
import Image from 'next/image';
import UserContext from '../auth/UserContext';
import Logo from '../../public/logo40x40.png';
import { PlusIcon, TextLogo } from '../utils/SVG';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TbBabyCarriage } from 'react-icons/tb';
import NotificationButton from '../notifications/NotificationButton';
import Home from './Home';
import SearchBar from './search/SearchBar';
import { NextComponentType } from 'next';

const Header:NextComponentType = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { session } = useContext(UserContext) as SessionProps;

  const className = {
    buttonHeader: 'items-center justify-center hover:bg-reddit_dark-brightest h-[32px] w-[32px] flex',
    icon: 'h-[20px] w-[20px] text-[#D7DADC] leading-5 align-middle'
  }
  const { setShow } = useContext(AuthModalContext) as AuthModalContextProps;

  return (
    <header
        id="myHeader"
        className={`h-12 sticky left-0 right-0 flex top-0 items-center z-30 bg-reddit_dark-brighter`}
      >
      <div className="flex flex-grow items-center px-2 lg:px-5 border-b border-reddit_border box-border">
        <div className='items-center inline-flex flex-grow'>
          <Link href={'/'}>
            <a aria-label='Home' className="flex items-center space-x-[6px]">
              <div className='pr-2 py-2 h-8 w-8 overflow-hidden relative'>
                <Image
                  src={Logo}
                  alt="logo"
                  layout='fill'
                />
              </div>
              <div className="hidden lg:block">
                <TextLogo />
              </div>
            </a>
          </Link>
          <Home />
          <SearchBar />
          {session && (
            <div id="user_icons" className="flex items-center space-x-2">
              {session.user.role === 1 && (
                <Link href={'/governance'}>
                  <a className={className.buttonHeader}>
                    <TbBabyCarriage className={className.icon} />
                  </a>
                </Link>
              )}
              <Link href={'/submit'}>
                <a aria-label='Create Post' className={className.buttonHeader}>
                  <PlusIcon className={className.icon} />
                </a>
              </Link>
            </div>
          )}
          {!session && (
            <div className={`mx-2 hidden flex-none sm:block`}>
              <button
                className={`ml-4 mr-2 h-8 w-20 md:mr-4 md:w-24 ${buttonClass(true)}`}
                onClick={() => setShow('login')}
              >
                <p>Log In</p>
              </button>
              <button
                className={`h-8 w-20 md:w-24 ${buttonClass()}`}
                onClick={() => setShow('register')}
              >
                <p>Sign Up</p>
              </button>
            </div>
          )}
          <div id='user_dropdown' className='h-[44px] lg:ml-2'>
            <ClickOutHandler onClickOut={() => setShowDropdown(false)}>
              <button
              aria-expanded='false'
              aria-label='user_dropdown'
              aria-haspopup='true'
              id='USER_DROPDOWN'
                className="flex items-center h-[44px] border border-transparent hover:border-reddit_border rounded-md"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {!session && (
                  <div className="m-1 h-5 w-5 rounded-full">
                    <UserIcon className="text-reddit_text-darker" />
                  </div>
                )}
                {session && (
                  <div className="mr-0 flex items-center lg:mr-16 h-full">
                    <div className="relative h-5 w-5 border border-reddit_border ml-2 mr-1">
                      <Image
                        src={session.user.avatar}
                        alt='User Icon'
                        layout="fill"
                      />
                    </div>
                    <span className="w-50 hidden px-1 text-sm font-semibold md:block">
                      {session.user.username}
                    </span>
                  </div>
                )}
                <RiArrowDownSLine className="h-[20px] w-[20px] text-reddit_text-darker" />
              </button>
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
      </div>
    </header>
  )
}

export default Header;

