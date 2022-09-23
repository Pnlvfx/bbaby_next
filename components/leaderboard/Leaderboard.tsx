import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCommunities } from '../API/communityAPI';
import TopCommunities from '../widget/TopCommunities';
import LeaderboardFeed from './LeaderboardFeed';
import LeaderboardMenu from './LeaderboardMenu';

const Leaderboard = () => {
  const router = useRouter();
  const [communities, setCommunities] = useState<CommunityProps[] | []>([]);

  useEffect(() => {
    if (!router.isReady) return;
    const getComm = async () => {
      const { category } = router.query
      const c = await getCommunities(25);
      setCommunities(c);
    }
    getComm();
  }, [router])

  return (
    <div className='flex flex-col' style={{minHeight: 'calc(100vh - 48px)'}}>
        <div className='z-[3]'>
          <div className="flex bg-reddit_dark-brighter h-24 justify-center">
          <div className="box-border flex flex-grow flex-col justify-center h-24 mx-6 max-w-[1200px] px-4">
            <h1 className="text-2xl font-bold leading-6 mb-2">Today&apos;s Top Growing Communities</h1>
            <span className="text-xs text-reddit_text-darker">
              Browse bbaby&apos;s top growing communities. Find the top
              communities in your favorite category.
            </span>
          </div>
        </div>
        <div className="max-w-[1248px] py-5 px-6 box-border flex justify-center mx-auto ">
          <LeaderboardMenu />
          <LeaderboardFeed communities={communities} />
          <div className='ml-8'>
            <TopCommunities />
          </div>
        </div>
        </div>
    </div>
  )
}

export default Leaderboard;

