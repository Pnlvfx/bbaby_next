import Link from 'next/link';
import { useEffect, useState } from 'react';
import TopCommunitiesContent from './TopCommunitiesContent';
import { getCommunities } from '../API/communityAPI';
import { useSession } from '../auth/UserContext';

const TopCommunities = () => {
  const [allCommunity, setAllCommunity] = useState<CommunityProps[] | []>([]);
  const [loadingCommunity, setLoadingCommunity] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    if (session?.device?.mobile) return;
    const getComm = async () => {
      try {
        setTimeout(async () => {
          try {
            const communities = await getCommunities(5);
            setAllCommunity(communities);
            setLoadingCommunity(false);
          } catch (err) {
            
          }
        }, 500);
      } catch (err) {
        console.log(err);
      }
    }
    getComm();
  }, []);

  return (
    <>
      <div className={`${loadingCommunity && "loading"} top-community`}
        style={{
          backgroundImage: `url("/topCommunitiesIcon.webp")`,
        }}
      >
        <h2 className='text-[16px] leading-5 bottom-2 absolute font-bold left-4 '>
          <Link href={'/bbaby/leaderboard'}>
            <a>
              Top Communities
            </a>
          </Link>
        </h2>
      </div>
      <>
        {allCommunity?.length >= 1 
        ? allCommunity.map((community, index) => {
            const rank = index + 1
            return(
              <TopCommunitiesContent
                key={community._id}
                rank={rank}
                community={community}
              />
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
              <a 
                className="flex justify-center w-full relative bg-white text-reddit_dark text-[14px] font-bold leading-4 min-h-[32px] min-w-[32px] py-1 px-4 items-center rounded-full box-border"
                tabIndex={0}
                role='button'
              >
                  View All
              </a>
            </Link>
          }
        </div>
      </>
    </>
  )
}

export default TopCommunities;

