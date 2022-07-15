import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import { HiChevronDown } from 'react-icons/hi';
import { MdOutlineCircle } from 'react-icons/md';
import Input from '../../utils/Input';
import CommunityList from './CommunityList';

type CommunityDropdownProps = {
  selectedCommunity?: string | string []
  setSelectedCommunity: any
}

type AllCommunityProps = [{
        _id: string
        communityAvatar: string
        name: string
}] | []

const CommunityDropdown = ({selectedCommunity,setSelectedCommunity}:CommunityDropdownProps) => {
  const [show,setShow] = useState(false)
  const [activeClass, setActiveClass] = useState('border border-reddit_border')
  const [allCommunity,setAllCommunity] = useState<AllCommunityProps>([]);

  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(server+'/communities?limit=11', {withCredentials:true})
    .then(response => setAllCommunity(response.data));
}, []);

  const chooseCommunity = (e:React.FormEvent<HTMLInputElement>) => {
    setSelectedCommunity(e?.currentTarget.value)
  }
  
  return (
    <ClickOutHandler onClickOut={() => {
      setShow(false)
      setActiveClass('border border-reddit_dark-brightest')
      }}>
      <div className={'w-[300px] rounded-md overflow-hidden ' + activeClass}>
        <button value={'choose a community'} onClick={() => {
            setActiveClass('border border-reddit_text')
            setShow(!show)
        }} className={'w-[300px] flex bg-reddit_dark-brighter h-[42px] '}>
            <MdOutlineCircle className='w-8 h-8 text-reddit_text-darker mx-2 self-center'/>
            <Input className='w-full h-full outline-none placeholder:text-gray-300 text-sm self-center'
            placeholder={show ? 'Search communities' : 'Choose a community'}
            value={selectedCommunity}
            onChange={(e:React.FormEvent<HTMLInputElement>) => chooseCommunity(e)}
            />
            <HiChevronDown className='text-reddit_text-darker w-8 h-8 self-center mr-2'/>
        </button>
        {show && (
          <div className={'fixed bg-reddit_dark-brighter z-30 text-reddit_text overflow-hidden '}>
              <div className='w-[300px]'>
                  {allCommunity.map(community => (
                      <CommunityList key={community._id} community={community} setSelectedCommunity={setSelectedCommunity} setActiveClass={setActiveClass} setShow={setShow} />
                  ))}
              </div>
          </div>
        )}
      </div>
  </ClickOutHandler>
  )
}

export default CommunityDropdown;