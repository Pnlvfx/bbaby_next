import Image from "next/image"
import React, { SetStateAction } from "react"

type CommunityListProps = {
  community: {
    communityAvatar: string
    name: string
  }
  setSelectedCommunity: React.Dispatch<SetStateAction<string>>
  setShow: React.Dispatch<SetStateAction<boolean>>
  setActiveClass: React.Dispatch<SetStateAction<string>>
}

function CommunityList({community,setSelectedCommunity,setShow,setActiveClass}:CommunityListProps) {
  return (
    <div className="">
      <button value={'community'} onClick={() => {
        setSelectedCommunity(community.name)
        setShow(false)
        setActiveClass('border-reddit_dark-brightest')
        }}>
          <div className="flex p-4">
            <Image src={community.communityAvatar} alt='' height={'40px'} width={'40px'} className='rounded-full self-center' />
            <p className="flex w-full ml-2 self-center">{community.name}</p>
          </div>
      </button>
    </div>
  )
}

export default CommunityList;