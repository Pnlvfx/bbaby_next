import Image from 'next/image';
import Link from 'next/link'
import { useContext } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import {AuthModalContext, AuthModalContextProps} from '../auth/modal/AuthModalContext';
import { subscribe } from '../API/communityAPI';
import { buttonClass } from '../utils/Button';
import { getCommunities } from '../API/communityAPI';

interface TopCommunitiesContentProps {
  community: CommunityProps
  rank: number
}

const TopCommunitiesContent = ({community, rank}:TopCommunitiesContentProps) => {
  const {setShow} = useContext(AuthModalContext) as AuthModalContextProps;

  const loader = () => {
    return `${community.communityAvatar}?w=20px&q=25`
  }

  const doSubscribe = async () => {
   try {
    const join = await subscribe(community.name,setShow)
    const refresh = await getCommunities(5)
   } catch (err) {
    
   }
  }

  return (
      <>
        <Link href={'/b/'+community.name.toLowerCase()}>
          <a>
            <div className='flex items-center p-1 h-[50px]'>
                <p className='text-sm font-extrabold mx-3'>{rank}</p>
                <RiArrowUpSLine className='w-5 h-5 text-green-500 mr-2' />
                <Image 
                  loader={loader} 
                  src={community.communityAvatar} 
                  alt='Community Icon' 
                  width={30} 
                  height={30} 
                  className='rounded-full'
                />          
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
      </>
  )
}

export default TopCommunitiesContent;
