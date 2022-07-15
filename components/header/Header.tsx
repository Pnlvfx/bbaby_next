import { useContext } from 'react'
import {
  BellIcon,
  ChatIcon,
  PlusIcon, 
  SearchIcon, 
  UserIcon, 
  } from '@heroicons/react/outline'
import Link from 'next/link';
import {useState} from 'react'
import Button from '../utils/Button'
import AuthModalContext from '../auth/AuthModalContext'
import ClickOutHandler from "react-clickout-ts";
import { CommunityContext } from '../community/CommunityContext';
import { useRouter } from 'next/router';
import UserMenu from './UserMenu'
import NotUserMenu from './NotUserMenu'
import Image from 'next/image';
import UserContext from '../auth/UserContext';
import Logo from '../../public/logo.png'
import {TextLogo} from '../utils/SVG'
import { RiArrowDownSLine } from 'react-icons/ri';
import {TbBabyCarriage} from 'react-icons/tb'
import NotificationButton from '../notifications/NotificationButton';
import Home from './Home';


function Header() {
    const provider = useContext(UserContext)
    const {session} = provider

    const router = useRouter()
    const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] = useState('hidden');
    const {setCommunity}:any = useContext(CommunityContext);
    const [searchText,setSearchText] = useState('')
    function toggleUserDropdown() {
        if (userDropdownVisibilityClass === 'hidden') {
            setUserDropdownVisibilityClass('block');
        } else {
            setUserDropdownVisibilityClass('hidden');
        }
    }

    function doSearch(ev: { preventDefault: () => void; }) {
        ev.preventDefault();
        router.push('/search/'+encodeURIComponent(searchText));
    }

    const {setShow}:any = useContext(AuthModalContext);
   

  return (
    <header id='myHeader' className={'w-full bg-reddit_dark-brighter p-1 border-b border-reddit_border sticky top-0 z-30'}>
        <div className='ml-0 lg:ml-2 flex'>
            <Link href={'/'}>
                <a className='flex' onClick={event => {
                    event.preventDefault(),
                    router.push('/'),
                    setCommunity()
                    }}>
                    <div className='relative mr-2 ml-0 lg:ml-2 self-center w-[34px] h-[34px]'>
                        <Image src={Logo} alt='logo' layout='fill'/>
                    </div>
                    <div className='hidden lg:block self-center'>
                        <TextLogo />
                    </div>  
                </a>
            </Link>
            <Home />
            <form onSubmit={doSearch} className='flex-none overflow-hidden mt-[2px] h-[38px] self-center bg-reddit_dark-brightest pl-3 flex rounded-sm border border-reddit_border flex-grow w-24 2xl:ml-64 2xl:mr-64 text-reddit_text-darker'>
                <SearchIcon className='h-5 w-5 self-center flex-none' />
                <input type='text' className='placeholder:text-reddit_text-darker bg-reddit_dark-brightest placeholder:text-sm text-sm p-1 pl-2 pr-0 block focus:outline-none text-reddit_text' 
                    placeholder='Search Bbaby' 
                    value={searchText} 
                    onChange={ev => setSearchText(ev.target.value)} />
            </form>
                {session && (
                    <div className='px-2 self-center flex'>
                        <button className=' hidden'>
                            <ChatIcon className='text-[#D7DADC] w-[25px] h-[25px] mx-2' />
                        </button>
                            <NotificationButton />
                        {session.user.role === 1 && (
                            <Link href={'/governance'}>
                                <a className='px-2 self-center'>
                                    <TbBabyCarriage className='text-[#D7DADC] self-center w-[25px] h-[25px] block' />
                                </a>
                            </Link>
                        )}
                        <Link href={'/submit'}>
                            <a className='px-2 self-center hidden md:block'>
                                <PlusIcon className='text-[#D7DADC] self-center w-[25px] h-[25px]' />
                            </a>
                        </Link>
                    </div>
                )}

                {!session && (
                <div className='mx-2 hidden sm:block self-center flex-none'>
                    <Button outline={1} className='h-8 ml-4 w-20 mr-2 md:mr-4 md:w-24' onClick={() => setShow('login')}>
                        <p className='self-center'>Log In</p>
                    </Button>
                    <Button className='h-8 w-20 md:w-24' onClick={() => setShow('register')}>
                        <p>Sign Up</p>
                    </Button>
                </div>
                )}
                <div className='self-center'>
                    <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
                        <div className='flex ml-0 lg:ml-4 self-center cursor-pointer' onClick={() => toggleUserDropdown()}>
                            {!session && (
                                <div className='w-6 h-6 m-1 rounded-full self-center'>
                                    <UserIcon className='text-reddit_text-darker' />
                                </div>
                            )}
                            {session && (
                                <div className="flex mr-0 lg:mr-16">
                                    <div className='w-6 h-6 relative border border-reddit_border self-center'>
                                        <Image src={session.user.avatar} alt='' layout='fill' objectFit='cover'/>
                                    </div>
                                    <span className="w-50 px-1 text-sm hidden md:block font-semibold self-center">
                                        {session.user.username}
                                    </span>
                                </div>
                            )}
                                <RiArrowDownSLine className='text-reddit_text-darker w-[22px] h-[22px] mr-0 lg:mr-[17px] self-center' />
                        </div>
                        {/*dropdown menu for user and not*/}
                        {session && (
                            <UserMenu userDropdownVisibilityClass={userDropdownVisibilityClass} setUserDropdownVisibilityClass={setUserDropdownVisibilityClass} />
                        )}
                        {!session && (
                            <NotUserMenu userDropdownVisibilityClass={userDropdownVisibilityClass} setUserDropdownVisibilityClass={setUserDropdownVisibilityClass} />
                        )}
                    </ClickOutHandler>
                </div>
        </div>
    </header>
  )
}

export default Header;