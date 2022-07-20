import Link from 'next/link'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import UserContext from '../auth/UserContext'
import { CategoriesLists } from '../community/general/CategoriesLists'

interface LeaderboardProps {
  active: number
  setActive: Dispatch<SetStateAction<number>>
}

const Leaderboard = ({active,setActive}:LeaderboardProps) => {
  const {session} = useContext(UserContext)
  const [totalShow,setTotalShow] = useState(12)
  const [showMore,setShowMore] = useState(false)

  return (
    <div
      className={
        'w-[200px] overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter pt-1 text-sm shadow-lg'
      }
    >
      <div className="flex h-[40px] bg-reddit_dark-brightest font-extrabold">
        <p className="ml-3 self-center">Categories</p>
      </div>
      <hr className="border-reddit_border" />
      {CategoriesLists.map((category, index) => (
        <>
        {index <= totalShow && (
          <div key={index}>
          <Link href={index === 0 ? `/bbaby/leaderboard` : `/bbaby/leaderboard/${category.replaceAll(" ", "_").toLowerCase()}`} scroll={false}>
              <a onClick={() => {
                setActive(index)
              }}>
                <div className={`flex h-[40px] ${active === index ? "bg-reddit_dark-brightest font-extrabold" : "hover:bg-reddit_dark-brightest"}`}>
                    <div className={`w-[6px] ${active === index && 'bg-reddit_blue'}`} />
                  <p className="ml-3 self-center">{category}</p>
                </div>
              </a>
          </Link>
        </div>
        )}
        </>
      ))}
      <div className='w-full items-center text-center'>
        <button onClick={() => {
          setTotalShow(totalShow === 12 ? CategoriesLists.length : 12)
          setShowMore(!showMore)
        }} className='rounded-full px-3 text-sm hover:bg-reddit_dark-brightest w-full'>
          <p className='font-bold py-1'>{showMore ? "Show Less" : "Show More"}</p>
        </button>
      </div>
    </div>
  )
}

export default Leaderboard;
