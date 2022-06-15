import { useContext } from 'react'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon, 
  PlusIcon, 
  SearchIcon, 
  UserIcon, 
  } from '@heroicons/react/outline'
import Link from 'next/link';
import {useState} from 'react'
import Button from '../utils/Button'
import AuthModalContext from '../auth/AuthModalContext'
import ClickOutHandler from "react-clickout-handler";
import { CommunityContext } from '../community/CommunityContext';
import { useRouter } from 'next/router';
import UserMenu from './UserMenu'
import NotUserMenu from './NotUserMenu'
import Image from 'next/image';
import UserContext from '../auth/UserContext';
import Logo from '../../public/logo.png'
import HomeIcon from '../../public/home.svg'
import {TextLogo} from '../utils/SVG'


function Header() {

    const provider = useContext(UserContext)
    const {session} = provider

    const router = useRouter()
    const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] = useState('hidden');
    const {setCommunity} = useContext(CommunityContext);
    const [searchText,setSearchText] = useState('')
    function toggleUserDropdown() {
        if (userDropdownVisibilityClass === 'hidden') {
            setUserDropdownVisibilityClass('block');
        } else {
            setUserDropdownVisibilityClass('hidden');
        }
    }

    function doSearch(ev) {
        ev.preventDefault();
        router.push('/search/'+encodeURIComponent(searchText));
    }

  const authModal = useContext(AuthModalContext);
   

  return (
    <header id='myHeader' className={'w-full bg-reddit_dark-brighter p-1 border-b border-reddit_border sticky top-0 z-30'}>
        <div className='ml-2 flex'>
        <button className='flex' value={'logo'} onClick={event => {
            event.preventDefault(),
            router.push('/'),
            setCommunity()
         }}>
            <div className='flex-none mt-2 mr-2'>
                <Image src={Logo} alt='logo' width={'30px'} height={'30px'}/>
            </div>
            <div className='hidden lg:block mt-2'>
           <TextLogo />
            </div>
             
        </button>
         {/* <div id='home_button' className='flex p-2'>
             <img src={homeIcon} alt='' className='flex-none w-5 h-5' />
             <h1>Home</h1>
         </div> */}
            <form onSubmit={doSearch} className=' bg-reddit_dark-brightest pl-3 flex rounded-md border border-reddit_border flex-grow w-24 xl:ml-64 xl:mr-64 text-reddit_text-darker'>
                <SearchIcon className='h-5 w-5 mt-3' />
                <input type='text' className='placeholder:text-reddit_text-darker bg-reddit_dark-brightest text-sm p-1 pl-2 pr-0 block focus:outline-none text-white' 
                    placeholder='Search Bbaby' 
                    value={searchText} 
                    onChange={ev => setSearchText(ev.target.value)} />
            </form>
                {session && (
                    <div className='px-2 my-auto'>
                <button className=' hidden'>
                    <ChatIcon className='text-reddit_text-darker w-6 h-6 mx-2' />
                </button>
                <button className='hidden'>
                    <BellIcon className='text-reddit_text-darker w-6 h-6 mx-2' />
                </button>
                <Link href={'/submit'} className=''>
                    <a className=''>
                    <PlusIcon className='text-reddit_text-darker w-6 h-6 hidden md:block' />
                    </a>
                </Link>
                    </div>
                )}

                {!session && (
                <div className='mx-2 hidden sm:block mt-1'>
                    <Button outline={1} className='h-8 ml-4 w-20 mr-2 md:mr-4 md:w-24' onClick={() => authModal.setShow('login')}>
                        Log In
                    </Button>
                    <Button className='h-8 w-20 md:w-24' onClick={() => authModal.setShow('register')}>
                        Sign up
                    </Button>
                </div>
                )}
                <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
                <button role={'presentation'} className='rounded-md flex ml-4 mt-1' onClick={() => toggleUserDropdown()}>
                    {!session && (
                        <div className='w-8 h-8 m-1 rounded-full'>
                            <UserIcon className='w-6 h-6 text-reddit_text-darker' />
                        </div>
                    )}
                    {session && (
                        <div className="flex mr-0 lg:mr-20">
                            <div className=' bg-gray-600 rounded-full m-1 w-8 h-8 overflow-hidden'>
                                <Image src={session.user.avatar} alt='' height={'32px'} width={'32px'}/>
                            </div>
                            <span className="w-50 pt-[9px] px-3 text-sm hidden md:block font-semibold">
                            {session.user.username}
                            </span>
                        </div>
                    )}
                        <ChevronDownIcon className='text-reddit_text-darker w-5 h-5 mr-2 mt-[7px]' />
                </button>
                {/*dropdown menu for user and not*/}
                {session && (
                     <UserMenu userDropdownVisibilityClass={userDropdownVisibilityClass} setUserDropdownVisibilityClass={setUserDropdownVisibilityClass} />
                )}
                {!session && (
                     <NotUserMenu userDropdownVisibilityClass={userDropdownVisibilityClass} setUserDropdownVisibilityClass={setUserDropdownVisibilityClass} />
                )}
                </ClickOutHandler>





        </div>
    </header>
  )
}

export default Header;