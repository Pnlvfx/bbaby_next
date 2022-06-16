import Image from 'next/image';
import Link from 'next/link'

function TopCommunitiesContent(props:any) {

  const loader = () => {
    return `${community.communityAvatar}?w=20px&q=25`
  }

  const community = props
  
  return (
      <div className='overflow-hidden'>
        <Link href={'/b/'+community.name}>
          <a>
          <div className='flex p-1 h-[50px]'>
            <div className='rounded-full mt-3 w-5 h-5 overflow-hidden'>
              <Image loader={loader} src={community.communityAvatar} alt='' width={'20px'} height={'20px'}/>          
            </div>
            <h3 className="h-12 pt-3 pl-4 font-bold text-sm">b/{community.name}</h3>
          </div>
          </a>
        </Link>
        <hr className='border-reddit_border'/>
      </div>
  )
}

export default TopCommunitiesContent;