import Link from 'next/link'

function TopCommunitiesContent(props) {
  return (
      <div className='overflow-hidden'>
        <Link href={'/b/'+props.name}>
          <a>
          <div className='flex p-1'>
          <img src={props.communityAvatar} className='w-5 h-5 rounded-full mt-3' />          
           <h3 className="h-12 pt-3 pl-4 font-bold text-sm">b/{props.name}</h3>
          </div>
          </a>
        </Link>
      <hr className='border-reddit_border' />
      </div>
  )
}

export default TopCommunitiesContent;