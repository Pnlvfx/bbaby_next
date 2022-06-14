import { useState } from 'react'
import TopCommunitiesContent from './TopCommunitiesContent'

function TopCommunities(props) {

    const {allCommunity,loadingCommunity} = props
    const [img,setImg] = useState('Blurred.webp')

    const image = setTimeout(() => {
      setImg('Icon.png')
    },[1000])



    return (
      <div className='bg-reddit_dark-brighter shadow-lg rounded-md ml-2 w-80 h-96 mb-5 border border-reddit_border box-content overflow-hidden'>
        <div style={{backgroundImage: `url("/topCommunities${img}")`,
              backgroundPosition: '50%',
              backgroundRepeat: 'no-repeat',
              height: '70px',
              position: 'relative'}}>
        </div>
                   {allCommunity.map(community => (
                       <TopCommunitiesContent key={community._id} {...community} loadingCommunity={loadingCommunity} />
                   ))}
      </div>
    )
  }
  
  export default TopCommunities;