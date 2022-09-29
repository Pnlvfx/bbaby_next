import Image from 'next/image'
import { SetStateAction, useContext } from 'react'
import { SubmitContext, SubmitContextType } from '../../SubmitContext'

type CommunityListProps = {
  community: CommunityProps
  setShow: React.Dispatch<SetStateAction<boolean>>
  setActiveClass: React.Dispatch<SetStateAction<boolean>>
}

const CommunityList = ({ community, setShow, setActiveClass }: CommunityListProps) => {
  const size = 35
  const { setSelectedCommunity, setCommunityIcon } = useContext(SubmitContext) as SubmitContextType

  return (
      <button className='w-full hover:bg-reddit_dark-brightest mb-3'
        value={'community'}
        onClick={() => {
          setCommunityIcon(community.communityAvatar)
          setSelectedCommunity(community.name)
          setShow(false)
          setActiveClass(false)
        }}
      >
        <div className="flex items-center text-left">
          <Image
            src={community.communityAvatar}
            alt='Community Icon'
            height={size}
            width={size}
            className="rounded-full"
          />
          <div className='ml-3'>
            <p className="">b/{community.name}</p>
            <p className='text-reddit_text-darker'>{community.subscribers} members</p>
          </div>
        </div>
      </button>
  )
}

export default CommunityList
