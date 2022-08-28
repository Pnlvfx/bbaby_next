import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../auth/UserContext';
import { getCategories } from '../cotegory/APIcategory';

const LeaderboardMenu = () => {
  const {session} = useContext(UserContext) as SessionProps;
  const [totalShow,setTotalShow] = useState(12);
  const [active,setActive] = useState(0)
  const [showMore,setShowMore] = useState(false)
  const [CategoriesLists,setCategoriesLists] = useState<CategoryProps[] | []>([])

  useEffect(() => {
    getCategories().then(res => {
      setCategoriesLists(res)
    })
  },[])

  return (
    <div className={'w-[200px] overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter text-sm'}>
      <div className="flex items-center h-[40px] bg-reddit_dark-brightest font-extrabold">
        <p className="ml-3">Categories</p>
      </div>
      <hr className="border-reddit_border" />
      {CategoriesLists.map((category, index) => (
        <>
        {index <= totalShow && (
          <ul key={category._id}>
          <Link href={index === 0 ? `/bbaby/leaderboard` : `/bbaby/leaderboard/${category.name.replaceAll(" ", "_").toLowerCase()}`} scroll={false}>
              <a onClick={() => {
                setActive(index)
              }}>
                <div className={`flex h-[40px] ${active === index ? "bg-reddit_dark-brightest font-extrabold" : "hover:bg-reddit_dark-brightest"}`}>
                    <div className={`w-[6px] ${active === index && 'bg-reddit_blue'}`} />
                  <p className="ml-3 self-center">{category.name}</p>
                </div>
              </a>
          </Link>
        </ul>
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

export default LeaderboardMenu;
