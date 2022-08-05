import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineOrderedList, AiOutlinePlus } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'
import { HiChevronDown } from 'react-icons/hi'
import { TbBabyCarriage } from 'react-icons/tb'
import UserContext from '../auth/UserContext'
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext'
import { HomeIcon } from '../utils/SVG'
import {TiNews} from 'react-icons/ti';

const Home = () => {
  const [path,setPath] = useState(<h1 className="ml-2 text-sm font-bold">Home</h1>)
  const [icon,setIcon] = useState(<HomeIcon className='w-5 h-5' />)
  const {communityInfo} = useContext(CommunityContext) as CommunityContextProps;
  const {session} = useContext(UserContext) as SessionProps;
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/best') {
      setPath(<h1 className="ml-2 text-sm font-bold">Home</h1>)
      setIcon(<HomeIcon />)
    } else if(router.query.community) {
      setPath(<span className="ml-2 text-sm font-bold">b/{router.query.community}</span>)
      setIcon(
        <div className='w-5 h-5 rounded-full bg-gray-800'>
            {communityInfo.communityAvatar && <Image className='rounded-full' src={communityInfo.communityAvatar} alt='' height={20} width={20} />}
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
          <Image className='rounded-full' src={session.user.avatar} alt='' height={20} width={20} />
        </div>
      )
    }
    else if (router.pathname.match('/governance')) {
      setPath(<h1 className="ml-2 text-sm font-bold">Gov</h1>)
      setIcon(<TbBabyCarriage className='w-5 h-5' />)
    } else if (router.pathname.match('/submit')) {
      setPath(<span className="ml-2 text-sm font-bold">Create Post</span>)
      setIcon(<AiOutlinePlus className='w-5 h-5' />)
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
    <div id="home_button" className=" hidden w-[255px] lg:block h-[36px] rounded-md border-reddit_border hover:border">
      <button className=" w-full h-full">
        <div className="ml-1 flex items-center">
          {icon}
          {path}
          <HiChevronDown className=" ml-auto mr-2 h-[23px] w-[23px]" />
        </div>
      </button>
    </div>
  )
}

export default Home;
