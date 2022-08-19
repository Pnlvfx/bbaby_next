import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { buttonClass } from '../utils/Button'
import TopCommunitiesContent from './TopCommunitiesContent'

const TopCommunities = () => {
  const [allCommunity, setAllCommunity] = useState<CommunityProps[] | []>([])
  const [loadingCommunity, setLoadingCommunity] = useState(true)

  const getBestCommunities = async () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const url = `${server}/best-communities?limit=5`
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
    })
    const communities = await res.json();
    setAllCommunity(communities);
    setLoadingCommunity(false)
  }

  useEffect(() => {
    if (isMobile) return;
    setTimeout(() => {
      getBestCommunities()
    }, 500)
  }, [])

  return (
    <div className="mb-5 box-content h-96 w-[310px] rounded-md border border-reddit_border bg-reddit_dark-brighter overflow-hidden">
        <div className={`${loadingCommunity && "loading"}`}
          style={{
            backgroundImage: loadingCommunity ? "#030303" : `url("/topCommunitiesIcon.webp")`,
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            height: '70px',
            position: 'relative',
          }}
        />
        <>
          {allCommunity.length >= 1 ? allCommunity.map(
            (community, index) => {
              const rank = index + 1
              return(
              (
                <TopCommunitiesContent
                  key={community._id}
                  rank={rank}
                  community={community}
                  getBestCommunities={getBestCommunities}
                />
              )
            )}
          ) : 
          [1,2,3,4,5].map((_,idx) => (
            <div key={idx} className={`h-[51px] ${loadingCommunity && "loading overflow-hidden"}`}>
              <hr className='border-reddit_border' />
            </div>
          ))
          }
          <div className={`${loadingCommunity && "loading"} mt-3 mx-2 h-[32px]`}>
            {!loadingCommunity && <Link href={`/bbaby/leaderboard`}>
              <a className="text-center">
                <button
                  className={`w-full h-[32px] ${buttonClass()}`}
                >
                  View All
                </button>
              </a>
            </Link>}
          </div>
        </>
    </div>
  )
}

export default TopCommunities;

