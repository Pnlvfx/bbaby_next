import { FaSpaceShuttle } from 'react-icons/fa'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {IoNewspaperOutline} from 'react-icons/io5'
import { useRouter } from 'next/router'

const BestPost = () => {
  const router = useRouter();
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (router.pathname.match('news')) {
      setActive(1)
    } else if (router.pathname.match('/' || '/best')) {
      setActive(0)
    }
  },[router])
  return (
    <div className="">
      <div className="flex space-x-3 rounded-md border border-reddit_border bg-reddit_dark-brighter py-[13px] px-2">
        <div className={`text-reddit_text-darker rounded-full py-1 px-3 hover:bg-reddit_dark-brightest 
        ${active === 0 && 'bg-reddit_dark-brightest font-bold text-white'}`}
        >
          <Link href={'/'} as={'/best'}>
            <a onClick={(e) => {
              e.preventDefault();
              setActive(0);
              router.push('/', '/best')
            }} className="flex items-center space-x-1">
              <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
              <p className="text-sm">Best</p>
            </a>
          </Link>
        </div>
        <div
          className={`text-reddit_text-darker rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
            active === 1 && 'bg-reddit_dark-brightest font-bold text-white'
          }`}
        >
          <Link href={'/news'}>
            <a onClick={(e) => {
              e.preventDefault()
              setActive(1);
              router.push('/news')
            }} className="flex items-center space-x-1">
              <IoNewspaperOutline className="h-5 w-5 -rotate-90" />
              <p className="text-sm">News</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BestPost;
