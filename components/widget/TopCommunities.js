import LoaderPlaceholder from '../post/LoaderPlaceholder';
import TopCommunitiesContent from './TopCommunitiesContent'

function TopCommunities(props) {

    const {allCommunity,loadingCommunity} = props
    return (
      <div className='bg-reddit_dark-brighter shadow-lg rounded-md ml-2 w-80 h-96 mb-5 border border-reddit_border box-content overflow-hidden'>
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
                   {allCommunity.map(community => (
                       <TopCommunitiesContent key={community._id} {...community} loadingCommunity={loadingCommunity} />
                   ))}
      </div>
    )
  }
  
  export default TopCommunities;