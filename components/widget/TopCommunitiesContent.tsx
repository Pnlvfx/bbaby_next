import Image from 'next/image';
import Link from 'next/link'
import { RiArrowUpSLine } from 'react-icons/ri';
import Button from '../utils/Button';

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
              <div className='self-center mx-3 font-extrabold'>
                  <h1 className='text-sm'>{community.rank}</h1>
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
                <Button className='my-1 mx-1'>
                  Join
                </Button>
              </div>
            </div>
          </a>
        </Link>
      </div>
  )
}

export default TopCommunitiesContent;