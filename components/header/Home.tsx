import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { HiChevronDown } from 'react-icons/hi'
import { TbBabyCarriage } from 'react-icons/tb'
import { useSession } from '../auth/UserContext'
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext'
import { HomeIcon, PlusIcon } from '../utils/SVG/SVG'
import { TiNews } from 'react-icons/ti'
import ClickOutHandler from 'react-clickout-ts'

const Home = () => {
  const [path, setPath] = useState(<h1 className="ml-2 text-sm font-bold">Home</h1>)
  const [icon, setIcon] = useState(<HomeIcon className="h-5 w-5" />)
  const { communityInfo } = useContext(CommunityContext) as CommunityContextProps
  const { session } = useSession()
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/best') {
      setPath(<h1 className="ml-2 text-sm font-bold">Home</h1>)
      setIcon(<HomeIcon />)
    } else if (router.query.community) {
      setPath(<span className="ml-2 text-sm font-bold">b/{router.query.community}</span>)
      setIcon(
        <div className="h-5 w-5 rounded-full bg-gray-800">
          {communityInfo.communityAvatar && (
            <Image className="rounded-full" src={communityInfo.communityAvatar} alt="Community Icon" height={20} width={20} />
          )}
        </div>
      )
    } else if (router.query.username) {
      setPath(<h1 className="ml-2 text-sm font-bold">u/{router.query.username}</h1>)
    } else if (session?.user && router.pathname.match('/settings')) {
      setPath(<span className="ml-2 text-sm font-bold">User Settings</span>)
      setIcon(
        <div className="h-5 w-5 rounded-full bg-gray-800">
          <Image className="rounded-full" src={session.user.avatar} alt="User Icon" height={20} width={20} />
        </div>
      )
    } else if (router.pathname.match('/governance')) {
      setPath(<h1 className="ml-2 text-sm font-bold">Gov</h1>)
      setIcon(<TbBabyCarriage className="h-5 w-5" />)
    } else if (router.pathname.match('/submit')) {
      setPath(<span className="ml-2 text-sm font-bold">Create Post</span>)
      setIcon(<PlusIcon className="h-5 w-5" />)
    } else if (router.pathname.match('/bbaby')) {
      setPath(<span className="ml-2 text-sm font-bold">Top Communities</span>)
      setIcon(<AiOutlineOrderedList className="h-5 w-5" />)
    } else if (router.pathname.match('/search')) {
      setPath(<h1 className="ml-2 text-sm font-bold">Search Results</h1>)
      setIcon(<BsSearch className="h-5 w-5" />)
    } else if (router.pathname.match('/news')) {
      setPath(<h1 className="ml-2 text-sm font-bold">News</h1>)
      setIcon(<TiNews className="h-5 w-5" />)
    }
  }, [router, communityInfo, session])

  return (
    <div
      aria-label="search your community"
      id="home_button"
      className={`relative hidden h-[36px] w-[270px] rounded-md border hover:border-reddit_border lg:block ${
        show ? 'border-reddit_border' : 'border-transparent'
      }`}
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          setShow(!show)
        }}
        className=" h-full w-full"
      >
        <ClickOutHandler
          onClickOut={() => {
            setShow(false)
          }}
        >
          <div className="ml-1 flex items-center">
            {icon}
            {path}
            <HiChevronDown className="ml-auto mr-2 h-[20px] w-[20px]" />
          </div>
        </ClickOutHandler>
      </button>
      {show && (
        <div
          className="solid absolute left-[-1px] top-[100%] right-0 mt-[-1px] box-border max-h-[482px] overflow-x-hidden overflow-y-scroll rounded-md border border-t-0 border-reddit_border bg-reddit_dark-brighter pb-4 "
          role={'menu'}
        >
          <input
            aria-label="search your community"
            className="mx-4 mt-4 box-border h-[30px] w-[calc(100%_-_32px)] border border-reddit_border bg-reddit_dark-brightest px-[6px] text-[16px] outline-none placeholder:text-reddit_text-darker"
            placeholder="Filter"
          />
          <div className="px-8 pt-4 pb-2 text-[10px] font-semibold uppercase leading-[16px] text-reddit_text-darker">Moderating</div>
        </div>
      )}
    </div>
  )
}

export default Home
