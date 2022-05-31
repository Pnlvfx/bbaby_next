import Image from "next/image"

function CommunityList(props) {


 

  return (
    <div className="">
      <button value={'community'} onClick={() => {
        props.setSelectedCommunity(props.name)
        props.setShow(false)
        props.setActiveClass('border-reddit_dark-brightest')
        }}>
          <div className="flex">
            <Image src={props.communityAvatar} height={'30px'} width={'30px'} className='flex-none object-contain'/>
            <h1 className="flex w-full p-2">{props.name}</h1>
          </div>
      </button>
    </div>
  )
}

export default CommunityList;