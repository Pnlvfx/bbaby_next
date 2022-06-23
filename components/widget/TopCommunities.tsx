import Link from 'next/link';
import LoaderPlaceholder from '../post/LoaderPlaceholder';
import Button from '../utils/Button';
import TopCommunitiesContent from './TopCommunitiesContent'

function TopCommunities(props:any) {
  const {refreshCommunities} = props

    const {allCommunity,loadingCommunity} = props
    return (
      <div className='bg-reddit_dark-brighter shadow-lg rounded-md ml-2 w-[310px] h-96 mb-5 border border-reddit_border box-content overflow-hidden'>
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
              <TopCommunitiesContent key={community._id} {...community} refreshCommunities={refreshCommunities}/>
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