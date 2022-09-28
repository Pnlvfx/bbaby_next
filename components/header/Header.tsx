import { useContext, useState } from 'react';
import Link from 'next/link';
import { buttonClass } from '../utils/Button';
import {AuthModalContext, AuthModalContextProps} from '../auth/modal/AuthModalContext';
import ClickOutHandler from 'react-clickout-ts';
import UserMenu from './UserMenu';
import NotUserMenu from './NotUserMenu';
import Image from 'next/future/image';
import Logo from '../../public/logo40x40.png';
import { PlusIcon, TextLogo, UserIcon } from '../utils/SVG';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TbBabyCarriage } from 'react-icons/tb';
import NotificationButton from '../notifications/NotificationButton';
import Home from './Home';
import SearchBar from './search/SearchBar';
import { NextComponentType } from 'next';
import { useSession } from '../auth/UserContext';

const Header: NextComponentType = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { session } = useSession();

  const className = {
    buttonHeader: 'items-center justify-center hover:bg-reddit_dark-brightest h-[32px] w-[32px] flex',
    icon: 'h-[20px] w-[20px] text-[#D7DADC] leading-5 align-middle'
  }
  const { setShow } = useContext(AuthModalContext) as AuthModalContextProps;

  return (
    <header id="myHeader" className={`h-12 fixed left-0 right-0 top-0 items-center inline-flex z-30 bg-reddit_dark-brighter`}>
      <div className="inline-flex flex-grow items-center px-2 lg:px-5 border-b border-reddit_border box-border">
        <div className='items-center inline-flex flex-grow'>
          <Link href={'/'}>
            <a aria-label='Home' className="inline-flex items-center flex-row">
              <Image
                src={Logo}
                alt="logo"
                width={40}
                height={40}
                className='p-1 mr-1 pl-0'
              />
              <TextLogo className='hidden lg:block' />
            </a>
          </Link>
          {session?.user && ( //add a variables to remove it from policies page
            <Home />
          )}
          <SearchBar />
          {session?.user && (
            <div id="user_icons" className="flex items-center space-x-2">
              {session?.user.role === 1 && (
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
          {!session?.user && (
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
          <div id='user_dropdown' className='h-[44px] lg:ml-2 flex items-center'>
            <ClickOutHandler onClickOut={() => setShowDropdown(false)}>
              <button
                aria-expanded={showDropdown}
                aria-label='user_dropdown'
                aria-haspopup='true'
                id='USER_DROPDOWN'
                className={`${!session && 'lg:w-[70px]'} min-h-[32px] flex items-center justify-center border border-transparent hover:border-reddit_border rounded-md py-[2px]`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {!session?.user && (
                  <span className="flex items-center">
                    <span className='flex items-center'>
                      <UserIcon className="text-reddit_text-darker w-5 h-5 leading-5 align-middle" />
                    </span>
                  </span>
                )}
                {session?.user && (
                  <div className="mr-0 flex items-center lg:mr-16 h-full">
                    <div className="h-5 w-5 border border-reddit_border ml-2 mr-1">
                      <Image
                        src={session.user.avatar}
                        alt='User Icon'
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="w-50 hidden px-1 text-sm font-semibold md:block">
                      {session.user.username}
                    </span>
                  </div>
                )}
                <RiArrowDownSLine className="text-[20px] text-reddit_text-darker w-5 h-5 leading-5 align-middle" />
              </button>
              {session?.user && showDropdown && (
                <UserMenu
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                />
              )}
              {!session?.user && showDropdown && (
                <NotUserMenu
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

