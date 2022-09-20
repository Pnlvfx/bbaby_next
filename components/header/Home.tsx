import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'
import { HiChevronDown } from 'react-icons/hi';
import { TbBabyCarriage } from 'react-icons/tb';
import UserContext from '../auth/UserContext';
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext';
import { HomeIcon, PlusIcon } from '../utils/SVG';
import {TiNews} from 'react-icons/ti';
import ClickOutHandler from 'react-clickout-ts';

const Home = () => {
  const [path,setPath] = useState(<h1 className="ml-2 text-sm font-bold">Home</h1>)
  const [icon,setIcon] = useState(<HomeIcon className='w-5 h-5' />)
  const {communityInfo} = useContext(CommunityContext) as CommunityContextProps;
  const {session} = useContext(UserContext) as SessionProps;
  const router = useRouter();
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/best') {
      setPath(<h1 className="ml-2 text-sm font-bold">Home</h1>)
      setIcon(<HomeIcon />)
    } else if(router.query.community) {
      setPath(<span className="ml-2 text-sm font-bold">b/{router.query.community}</span>)
      setIcon(
        <div className='w-5 h-5 rounded-full bg-gray-800'>
            {communityInfo.communityAvatar && (
              <Image 
                className='rounded-full' 
                src={communityInfo.communityAvatar} 
                alt='Community Icon'
                height={20} 
                width={20} 
              />
            )}
        </div>
      )
    }
    else if (router.query.username) {
      setPath(<h1 className="ml-2 text-sm font-bold">u/{router.query.username}</h1>)
    }
    else if (session && router.pathname.match('/settings')) {
      setPath(<span className="ml-2 text-sm font-bold">User Settings</span>)
      setIcon(
        <div className='w-5 h-5 rounded-full bg-gray-800'>
          <Image 
            className='rounded-full' 
            src={session.user.avatar} 
            alt='User Icon' 
            height={20} 
            width={20} 
          />
        </div>
      )
    }
    else if (router.pathname.match('/governance')) {
      setPath(<h1 className="ml-2 text-sm font-bold">Gov</h1>)
      setIcon(<TbBabyCarriage className='w-5 h-5' />)
    } else if (router.pathname.match('/submit')) {
      setPath(<span className="ml-2 text-sm font-bold">Create Post</span>)
      setIcon(<PlusIcon className='w-5 h-5' />)
    } else if (router.pathname.match('bbaby')) {
      setPath(<span className="ml-2 text-sm font-bold">Top Communities</span>)
      setIcon(<AiOutlineOrderedList className='w-5 h-5' />)
    } else if (router.pathname.match('search')) {
      setPath(<h1 className="ml-2 text-sm font-bold">Search Results</h1>)
      setIcon(<BsSearch className='w-5 h-5' />)
    } else if (router.pathname.match('news')) {
      setPath(<span className="ml-2 text-sm font-bold">News</span>)
      setIcon(<TiNews className='w-5 h-5' />)
    }
  }, [router,communityInfo,session])

  return (
    <div 
      aria-label='search your community' 
      id="home_button" 
      className={`relative hidden w-[270px] lg:block h-[36px] rounded-md border hover:border-reddit_border ${show ? 'border-reddit_border' : 'border-transparent'}`}
    >
      <button onClick={(e) => {
          e.preventDefault();
          setShow(!show)
        }} className=" w-full h-full"
      >
        <ClickOutHandler onClickOut={() => {
          setShow(false);
        }}
        >
        <div className="ml-1 flex items-center">
          {icon}
          {path}
          <HiChevronDown className="ml-auto mr-2 h-[20px] w-[20px]" />
        </div>
        </ClickOutHandler>
      </button>
      {show && 
      <div className='pb-4 bg-reddit_dark-brighter border solid border-t-0 overflow-x-hidden overflow-y-scroll border-reddit_border rounded-md box-border left-[-1px] mt-[-1px] max-h-[482px] top-[100%] right-0 absolute ' role={'menu'}>
        <input aria-label='search your community'
          className='text-[16px] bg-reddit_dark-brightest border border-reddit_border h-[30px] mt-4 mx-4 outline-none box-border px-[6px] placeholder:text-reddit_text-darker' 
          style={{width: 'calc(100% - 32px)'}}
          placeholder='Filter'
        />
        <div className='text-reddit_text-darker uppercase px-8 pt-4 pb-2 text-[10px] font-semibold leading-[16px]'>Moderating</div>
      </div>
      }
    </div>
  )
}

export default Home;
