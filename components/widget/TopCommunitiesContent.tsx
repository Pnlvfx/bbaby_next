import Image from 'next/image';
import Link from 'next/link'
import { useContext } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import {AuthModalContext, AuthModalContextProps} from '../auth/AuthModalContext';
import { subscribe } from '../community/APicommunity';
import { buttonClass } from '../utils/Button';

interface TopCommunitiesContentProps {
  community: CommunityProps
  getBestCommunities: Function
  rank: number
}

function TopCommunitiesContent({community,getBestCommunities,rank}:TopCommunitiesContentProps) {
  const {setShow} = useContext(AuthModalContext) as AuthModalContextProps;

  const loader = () => {
    return `${community.communityAvatar}?w=20px&q=25`
  }

  const doSubscribe = async () => {
    const join = await subscribe(community.name,setShow)
    const refresh = await getBestCommunities()
  }

  return (
      <div className=''>
        <Link href={'/b/'+community.name}>
          <a>
            <div className='flex items-center p-1 h-[50px]'>
                <h1 className='text-sm font-extrabold mx-3'>{rank}</h1>
                <RiArrowUpSLine className='w-5 h-5 text-green-500 mr-2' />
                <Image loader={loader} src={community.communityAvatar} alt='' width={'30px'} height={'30px'} className='rounded-full'/>          
                <p className="ml-2 font-bold text-sm">b/{community.name}</p>
              <div className='ml-auto mr-2'>
                   <button onClick={(e) => {
                    e.preventDefault()
                    doSubscribe()
                  }} 
                  className={`py-[3px] px-4 mx-1 ${buttonClass(community.user_is_subscriber ? true : false)}`}>
                    <span className='text-xs'>{community.user_is_subscriber ? "Joined" : "Join"}</span>
                  </button>
              </div>
            </div>
          </a>
        </Link>
        <hr className='border-reddit_border'/>
      </div>
  )
}

export default TopCommunitiesContent;
