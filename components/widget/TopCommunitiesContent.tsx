import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import { useContext } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import {AuthModalContext, AuthModalContextProps} from '../auth/AuthModalContext';
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

  const subscribe = async() => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const data = {community: community.name}
      const res = await axios({
        method: 'POST',
        url: `${server}/communities/subscribe`,
        data,
        withCredentials:true
      })
      getBestCommunities()
    } catch (err:any) {
      if (err.response.status === 401) {
        setShow('login')
      }
    }
  }

  return (
      <div className='overflow-hidden'>
        <Link href={'/b/'+community.name}>
          <a>
            <div className='flex p-1 h-[50px]'>
              <div className='self-center mx-3 font-extrabold'>
                  <h1 className='text-sm'>{rank}</h1>
              </div>
              <div className='self-center'>
                <RiArrowUpSLine className='w-5 h-5 text-green-500 mr-2' />
              </div>
              <div className='rounded-full w-[30px] h-[30px] overflow-hidden self-center'>
                <Image loader={loader} src={community.communityAvatar} alt='' width={'30px'} height={'30px'}/>          
              </div>
              <div className='self-center'>
                <h1 className="ml-2 font-bold text-sm">b/{community.name}</h1>
              </div>
              <div className='self-center ml-auto mr-2'>
                {!community.user_is_subscriber && (
                  <button onClick={(e) => {
                    e.preventDefault()
                      subscribe()
                  }} className={`py-[3px] px-4 mx-1 ${buttonClass()}`}>
                    <p className='text-xs'>Join</p>
                  </button>
                )}
                {community.user_is_subscriber && (
                   <button onClick={(e: { preventDefault: () => void; }) => {
                    e.preventDefault()
                      subscribe()
                  }} className={`py-[3px] px-4 mx-1 ${buttonClass(true)}`}>
                    <span className='text-xs'>Joined</span>
                  </button>
                )}
              </div>
            </div>
          </a>
        </Link>
        <hr className='border-reddit_border'/>
      </div>
  )
}

export default TopCommunitiesContent;
