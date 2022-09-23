import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { buttonClass } from '../utils/Button';
import TopCommunitiesContent from './TopCommunitiesContent';
import { getCommunities } from '../API/communityAPI';

const TopCommunities = () => {
  const [allCommunity, setAllCommunity] = useState<CommunityProps[] | []>([])
  const [loadingCommunity, setLoadingCommunity] = useState(true)

  useEffect(() => {
    if (isMobile) return;
    const getComm = async () => {
      try {
        setTimeout(async () => {
          const communities = await getCommunities(5);
          setAllCommunity(communities);
          setLoadingCommunity(false);
        }, 500);
      } catch (err) {
        
      }
    }
    getComm();
  }, [])

  return (
    <>
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
          {allCommunity.length >= 1 
          ? allCommunity.map(
            (community, index) => {
              const rank = index + 1
              return(
              (
                <TopCommunitiesContent
                  key={community._id}
                  rank={rank}
                  community={community}
                />
              )
            )}
          ) 
          : 
          [1, 2, 3, 4, 5].map((_,idx) => (
            <div key={idx} className={`h-[51px] ${loadingCommunity && "loading overflow-hidden"}`}>
              <hr className='border-reddit_border' />
            </div>
          ))
          }
          <div className={`${loadingCommunity && "loading"} mt-3 mx-2 mb-3 h-[32px]`}>
            {!loadingCommunity && 
              <Link href={`/bbaby/leaderboard`}>
                <a className="text-center">
                  <button
                    className={`w-full h-[32px] ${buttonClass()}`}
                  >
                    View All
                  </button>
                </a>
              </Link>
            }
          </div>
        </>
    </>
  )
}

export default TopCommunities;

