import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '../cotegory/APIcategory';

const LeaderboardMenu = () => {
  const [totalShow, setTotalShow] = useState(12);
  const [active, setActive] = useState(-1);
  const [showMore, setShowMore] = useState(false);
  const [CategoriesLists, setCategoriesLists] = useState<CategoryProps[] | []>([]);

  useEffect(() => {
    getCategories().then(res => {
      setCategoriesLists(res);
    })
  },[]);

  return (
    <div className='hidden md:block mr-6'>
      <div className='flex flex-col h-full'>
        <div className={'bg-reddit_dark-brighter border border-reddit_border rounded-md overflow-visible w-[192px] break-words'}>
          <div className="text-[16px] leading-5 flex items-center h-[40px] bg-reddit_dark-brightest border-b border-reddit_border font-extrabold pl-4">
            <h2>Categories</h2>
          </div>
          <div>
            <ul className={`${totalShow === 12 ? 'h-[432px] overflow-hidden' : 'h-[1188px] overflow-auto'}`}>
              <li key={-1}>
                <Link 
                  href={`/bbaby/leaderboard`} scroll={false}
                  className='text-[12px] capitalize' onClick={() => {
                    setActive(-1)
                  }}
                >
                  <div className={`flex h-[40px] ${active === -1 ? "bg-reddit_dark-brightest font-extrabold" : "hover:bg-reddit_dark-brightest"}`}>
                      <div className={`w-[6px] ${active === -1 && 'bg-reddit_blue'}`} />
                    <p className="ml-3 self-center">All Communities</p>
                  </div>
                </Link>
              </li>
              {CategoriesLists.map((category, index) => (
              <>
              {index <= totalShow && (
                <li key={category._id}>
                  <Link 
                    href={`/bbaby/leaderboard/${category.name.replaceAll(" ", "_").toLowerCase()}`} 
                    scroll={false}
                    className='text-[12px] capitalize' onClick={() => {
                      setActive(index)
                    }}
                  >
                    <div className={`flex h-[40px] ${active === index ? "bg-reddit_dark-brightest font-extrabold" : "hover:bg-reddit_dark-brightest"}`}>
                        <div className={`w-[6px] ${active === index && 'bg-reddit_blue'}`} />
                      <p className="ml-3 self-center">{category.name}</p>
                    </div>
                  </Link>
                </li>
              )}
              </>
            ))}
            </ul>
          </div>
          <div className='w-full items-center text-center'>
            <button onClick={() => {
              setTotalShow(totalShow === 12 ? CategoriesLists.length : 12)
              setShowMore(!showMore)
            }} className='rounded-full px-3 text-sm hover:bg-reddit_dark-brightest w-full'>
              <p className='font-bold py-1'>{showMore ? "Show Less" : "Show More"}</p>
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default LeaderboardMenu;
