import { useRouter } from 'next/router';
import LoaderPlaceholder from '../post/LoaderPlaceholder';
import Button from '../utils/Button';
import TopCommunitiesContent from './TopCommunitiesContent'

function TopCommunities(props) {

    const {allCommunity,loadingCommunity} = props
    const router = useRouter()
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
            {allCommunity.map((community,index) => (
              community.rank = index + 1,
              <TopCommunitiesContent key={community._id} {...community}/>
            ))}
            <div className='mx-auto pt-3 text-center'>
              <Button onClick={() => {
                router.push(`/bbaby/leaderboard`)
              }} className=' mx-2 py-[6px] w-full max-w-[290px] self-center'>
                View All
              </Button>
            </div>
          </>
          )}
      </div>
    )
  }
  
  export default TopCommunities;