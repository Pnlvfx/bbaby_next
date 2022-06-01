import TopCommunitiesContent from './TopCommunitiesContent'

function TopCommunities(props) {

    const {allCommunity} = props

    return (
      <div className='bg-reddit_dark-brighter shadow-lg rounded-md ml-2 w-80 h-96 mb-5 border border-reddit_border box-content overflow-hidden'>
          <div className="object-contain" style={{backgroundImage: `url("/topCommunitiesIcon.png")`,
            backgroundColor: '#0079d3',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            height: '70px',
            position: 'relative'
        }}>
          </div>
                   {allCommunity.map(community => (
                       <TopCommunitiesContent key={community._id} {...community} />
                   ))}
      </div>
    )
  }
  
  export default TopCommunities;