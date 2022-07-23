import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import LoaderPlaceholder from '../post/LoaderPlaceholder';
import Button from '../utils/Button';
import TopCommunitiesContent from './TopCommunitiesContent'

function TopCommunities() {
  const [allCommunity,setAllCommunity] = useState([]);
  const [loadingCommunity,setLoadingCommunity] = useState(true)

  const getCommunities = () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(`${server}/best-communities?limit=5`,{withCredentials:true})
      .then(response => {
        setAllCommunity(response.data)
        setLoadingCommunity(false)
      });
  }

  useEffect(() => {
    if (isMobile) return
    setTimeout(() => {
      getCommunities()
    },500)
    }, []);

    return (
      <div className='mb-5 bg-reddit_dark-brighter rounded-md w-[310px] h-96 border border-reddit_border box-content overflow-hidden'>
        {loadingCommunity && (
          <LoaderPlaceholder extraStyles={{height: '80px'}} />
        )}
        {!loadingCommunity && (
           <div style={{backgroundImage: `url("/topCommunitiesIcon.webp")`,
                backgroundPosition: '50%',
                backgroundRepeat: 'no-repeat',
                height: '70px',
                position: 'relative'}}>
          </div>
        )}
          {loadingCommunity && (
          <div className='h-[50px]'>
            <LoaderPlaceholder extraStyles={{height: '50px'}} />
            <LoaderPlaceholder extraStyles={{height: '50px'}} />
            <LoaderPlaceholder extraStyles={{height: '50px'}} />
            <LoaderPlaceholder extraStyles={{height: '50px'}} />
            <LoaderPlaceholder extraStyles={{height: '50px'}} />
          </div>
          )}
          {!loadingCommunity && (
          <>
            {allCommunity.map((community:any,index:any) => (
              community.rank = index + 1,
              <TopCommunitiesContent key={community._id} {...community} refreshCommunities={getCommunities}/>
            ))}
            <div className='pt-3'>
            <Link href={`/bbaby/leaderboard`}>
              <a className='mx-auto text-center'>
                <Button className=' mx-2 py-[6px] w-full max-w-[290px] self-center'>
                  View All
                </Button>
              </a>
            </Link>
            </div>
          </>
          )}
      </div>
    )
  }
  
  export default TopCommunities;