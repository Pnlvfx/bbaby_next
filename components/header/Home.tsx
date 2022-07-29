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
  const [path,setPath] = useState('    ')
  const [icon,setIcon] = useState(<HomeIcon className='w-5 h-5' />)
  const {communityInfo} = useContext(CommunityContext) as CommunityContextProps;
  const {session} = useContext(UserContext) as SessionProps;
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/best') {
      setPath('Home')
      setIcon(<HomeIcon />)
    } else if(router.query.community) {
      setPath(`b/${router.query.community}`)
      setIcon(
        <Image className='rounded-full' src={communityInfo.communityAvatar} alt='' height={20} width={20} />
      )
    }
    else if (router.query.username) {
      setPath(`u/${router.query.username}`)
    }
    else if (session && router.pathname.match('/settings')) {
      setPath("User Settings")
      setIcon(<Image className='rounded-full' src={session.user.avatar} alt='' height={20} width={20} />)
    }
    else if (router.pathname.match('/governance')) {
      setPath("Gov")
      setIcon(<TbBabyCarriage className='w-5 h-5' />)
    } else if (router.pathname.match('/submit')) {
      setPath('Create Post')
      setIcon(<AiOutlinePlus className='w-5 h-5' />)
    } else if (router.pathname.match('bbaby')) {
      setPath("Top Communities")
      setIcon(<AiOutlineOrderedList className='w-5 h-5' />)
    } else if (router.pathname.match('search')) {
      setPath('Search Results')
      setIcon(<BsSearch className='w-5 h-5' />)
    } else if (router.pathname.match('news')) {
      setPath('News')
      setIcon(<TiNews className='w-5 h-5' />)
    }
  }, [router])

  return (
    <div id="home_button" className=" hidden w-[255px] lg:block h-[36px] rounded-md border-reddit_border hover:border">
      <button className=" w-full h-full">
        <div className="ml-1 flex items-center">
          {icon}
          <p className="ml-2 text-sm font-bold">{path}</p>
          <HiChevronDown className=" ml-auto mr-2 h-[23px] w-[23px]" />
        </div>
      </button>
    </div>
  )
}

export default Home;
