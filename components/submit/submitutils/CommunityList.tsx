import Image from "next/image"
import React, { SetStateAction, useContext } from "react"
import { SubmitContext, SubmitContextType } from "../SubmitContext"

type CommunityListProps = {
  community: {
    communityAvatar: string
    name: string
  }
  setShow: React.Dispatch<SetStateAction<boolean>>
  setActiveClass: React.Dispatch<SetStateAction<string>>
}

const CommunityList = ({community,setShow,setActiveClass}:CommunityListProps) => {
  const {setSelectedCommunity,setCommunityIcon} = useContext(SubmitContext) as SubmitContextType
  return (
    <div className="">
      <button value={'community'} onClick={() => {
        setCommunityIcon(community.communityAvatar)
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