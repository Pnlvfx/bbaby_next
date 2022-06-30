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
          <div className="flex">
            <Image src={community.communityAvatar} alt='' height={'30px'} width={'30px'} className='flex-none object-contain'/>
            <h1 className="flex w-full p-2">{community.name}</h1>
          </div>
      </button>
    </div>
  )
}

export default CommunityList;