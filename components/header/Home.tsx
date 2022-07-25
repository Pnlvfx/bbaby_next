import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { HomeIcon } from '../utils/SVG'

const Home = () => {
  const [path,setPath] = useState('    ')
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/') {
      setPath('Home')
    } else if(router.query.community) {
      setPath(`b/${router.query.community}`)
    }
    else if (router.query.username) {
      setPath(`u/${router.query.username}`)
    }
    else if (router.pathname.match('/settings')) {
      setPath("User Settings")
    }
    else if (router.pathname.match('/governance')) {
      setPath("Gov")
    } else if (router.pathname.match('/submit')) {
      setPath('Create Post')
    } else if (router.pathname.match('bbaby')) {
      setPath("Top Communities")
    } else if (router.pathname.match('search')) {
      setPath('Search Results')
    }
  }, [router])

  return (
    <div id="home_button" className=" hidden w-[255px] lg:block h-[36px] rounded-md border-reddit_border hover:border">
      <button className=" w-full h-full">
        <div className="ml-1 flex items-center">
          <HomeIcon />
          <h1 className="ml-2 text-sm font-bold">{path}</h1>
          <HiChevronDown className=" ml-auto mr-2 h-[23px] w-[23px]" />
        </div>
      </button>
    </div>
  )
}

export default Home;
