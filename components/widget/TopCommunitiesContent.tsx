import Image from 'next/image';
import Link from 'next/link'
import { RiArrowUpSLine } from 'react-icons/ri';
import SubscribeButton from '../utils/buttons/SubscribeButton';

interface TopCommunitiesContentProps {
  community: CommunityProps
  rank: number
}

const TopCommunitiesContent = ({community, rank}: TopCommunitiesContentProps) => {

  return (
      <>
        <Link href={'/b/'+community.name.toLowerCase()}>
          <div className='flex items-center p-1 h-[50px]'>
              <p className='text-sm font-extrabold mx-3'>{rank}</p>
              <RiArrowUpSLine className='w-5 h-5 text-green-500 mr-2' />
              <Image
                src={community.communityAvatar} 
                alt='Community Icon' 
                width={30} 
                height={30} 
                className='rounded-full'
              />          
              <p className="ml-2 font-bold text-sm">b/{community.name}</p>
            <div className='ml-auto mr-2'>
              <SubscribeButton community={community} />
            </div>
          </div>
        </Link>
        <hr className='border-reddit_border'/>
      </>
  )
}

export default TopCommunitiesContent;
