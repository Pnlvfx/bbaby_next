import { FaSpaceShuttle } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

const BestPost = () => {
  const [active, setActive] = useState(0)
  return (
    <div className="">
      <div className="flex rounded-md border border-reddit_border bg-reddit_dark-brighter py-[13px] px-2">
        <div
          className={`rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
            active === 0 && 'bg-reddit_dark-brightest'
          }`}
        >
          <Link href={'/'} as={'/best'}>
            <a className="flex items-center space-x-1">
              <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
              <h1 className="text-sm font-bold">Best</h1>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BestPost;
