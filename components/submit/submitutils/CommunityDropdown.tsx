import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [activeClass, setActiveClass] = useState('border-reddit_dark-brightest')
  const [allCommunity,setAllCommunity] = useState<AllCommunityProps>([]);

  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(server+'/communities?limit=11', {withCredentials:true})
    .then(response => setAllCommunity(response.data));
}, []);
  
  return (
    <ClickOutHandler onClickOut={() => {
      setShow(false)
      setActiveClass('border-reddit_dark-brightest')
      }}>
      <div className='w-[300px]'>
      <button value={'choose a community'} onClick={() => {
          setActiveClass('hover:border border-reddit_text')
          setShow(!show)
      }} className={'border border-reddit_border flex bg-reddit_dark-brighter h-[42px] rounded-md '+ activeClass}>
              <MdOutlineCircle className='w-10 h-10 text-reddit_text-darker mx-2 '/>
              <Input className='w-full h-full outline-none placeholder:text-gray-300 text-sm'
              placeholder={'Choose a community'}
              value={selectedCommunity}
              readOnly={true}
              />
              <HiChevronDown className='text-reddit_text-darker w-10 h-10 ml-12 mr-2'/>
      </button>
     
      {show && (
              <div className={' border border-reddit_text absolute bg-reddit_dark-brighter z-10 text-reddit_text overflow-hidden '}>
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