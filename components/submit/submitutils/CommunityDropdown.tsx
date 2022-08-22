import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import { HiChevronDown } from 'react-icons/hi';
import { MdOutlineCircle } from 'react-icons/md';
import UserContext from '../../auth/UserContext';
import { getUserPrefCommunities, searchCommunity } from '../../community/APicommunity';
import { CommunityContext, CommunityContextProps } from '../../community/CommunityContext';
import { inputClass } from '../../utils/Input';
import { SubmitContext, SubmitContextType } from '../SubmitContext';
import CommunityList from './CommunityList';
import {BiSearch} from 'react-icons/bi';

const CommunityDropdown = () => {
  const { session } = useContext(UserContext) as SessionProps;
  const [show, setShow] = useState(false)
  const [activeClass, setActiveClass] = useState(false)
  const [allCommunity, setAllCommunity] = useState<CommunityProps[] | []>([])
  const { selectedCommunity, setSelectedCommunity } = useContext(SubmitContext) as SubmitContextType
  const {getCommunity,communityInfo,setShow:setShowCommunityForm} = useContext(CommunityContext) as CommunityContextProps

  const chooseCommunity = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSelectedCommunity(e?.currentTarget.value)
  }

  const createNewCommunity = () => {
    setShowCommunityForm(true);
  }

  useEffect(() => {  ///FIRST CALL  USER PREF COMMUNITY.
    if (!session) return;
    if (selectedCommunity) {
      getCommunity(selectedCommunity)
    } else {
      setTimeout(() => {
        getUserPrefCommunities().then(res => {
          setAllCommunity(res)
        })
      },850)
    }
  },[])

  useEffect(() => { ///SEARCH
    if (!selectedCommunity) return;
    if (!session) return;
    const timer = setTimeout(() => {
      searchCommunity(selectedCommunity).then((res) => {
        setAllCommunity(res)
      })
    },500)
    return () => {
      clearTimeout(timer)
    }
  },[selectedCommunity])

  return (
    <>
      <ClickOutHandler
        onClickOut={() => {
          setShow(false)
          setActiveClass(false)
        }}
      >
        <div className={`w-[300px] overflow-hidden rounded-md border-reddit_border ${activeClass ? 'border-x-2 border-t-2 border-b' : 'border'}`}>
          <button className={'flex h-[40px] items-center w-[300px] bg-reddit_dark-brighter'}
            value={'choose a community'}
            onClick={() => {
              setActiveClass(true)
              setShow(true)
            }}>
            <div className='mx-2 flex items-center h-full w-full'>
              {!communityInfo?.communityAvatar && show ? <BiSearch className="h-[22px] w-[22px] text-reddit_text-darker" /> :
              !communityInfo.communityAvatar && !show ? <MdOutlineCircle className="h-[22px] w-[22px] text-reddit_text-darker" /> :
              communityInfo?.communityAvatar && show ? <BiSearch className="h-[22px] w-[22px] text-reddit_text-darker" /> :
              <Image src={communityInfo.communityAvatar} width={22} height={22} className='rounded-full' alt='' />
              }
            <input
              className={`${inputClass} h-[50%] w-full ml-2 text-sm outline-none placeholder:text-gray-300 font-bold`}
              placeholder={show ? 'Search communities' : 'Choose a community'}
              value={selectedCommunity}
              onChange={(e) => {
                chooseCommunity(e)
              }}
            />
            <HiChevronDown className="h-[29px] w-[29px] text-reddit_text-darker" />
            </div>
          </button>
        </div>
        {show && (
          <div className={'absolute z-30 w-[300px] overflow-hidden bg-reddit_dark-brighter'}>
            <div
              className={`border-t-none max-h-[400px] overflow-y-scroll border-reddit_border ${
                activeClass ? 'border-x-2 border-b-2' : ''
              }`}
            >
              <div className="text-sm font-bold p-3">
                <p className="px-2 py-1 text-[11px] font-bold text-reddit_text-darker">YOUR PROFILE</p>
                  {session && (
                    <button className="flex w-full items-center space-x-2 my-1 hover:bg-reddit_dark-brightest">
                      <div className='border rounded-md overflow-hidden border-reddit_border'>
                      <Image
                        src={session.user.avatar}
                        alt=""
                        width={25}
                        height={25}
                      />
                      </div>
                      <p>u/{session.user.username}</p>
                    </button>
                  )}
                  <hr className='border-reddit_border my-2' />
                  <div className='flex items-center'>
                    <p className='px-2 py-1 text-[11px] font-bold text-reddit_text-darker'>YOUR COMMUNITIES</p>
                    <button onClick={() => {
                      setShow(false)
                      setShowCommunityForm(true);
                    }} className='ml-auto hover:bg-reddit_dark-brightest rounded-full'>
                      <p className='text-[13px] font-bold px-2 py-1'>Create new</p>
                    </button>
                  </div>
                {allCommunity.map((community) => (
                  <>
                    <CommunityList
                      key={community._id}
                      community={community}
                      setActiveClass={setActiveClass}
                      setShow={setShow}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </ClickOutHandler>
    </>
  )
}

export default CommunityDropdown;

