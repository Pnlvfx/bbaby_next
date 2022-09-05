import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import { HiChevronDown } from 'react-icons/hi';
import UserContext from '../../auth/UserContext';
import { getUserPrefCommunities, searchCommunity } from '../../community/APicommunity';
import { CommunityContext, CommunityContextProps } from '../../community/CommunityContext';
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

  const openDropdown = () => {
    setActiveClass(true)
    setShow(true)
  }

  const closeDropdown = () => {
    setShow(false)
    setActiveClass(false)
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
      }, 450)
    }
  },[])

  useEffect(() => { ///SEARCH
    if (!selectedCommunity) return;
    if (!session) return;
    const timer = setTimeout(() => {
      searchCommunity(selectedCommunity).then((res) => {
        setAllCommunity(res)
      })
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  },[selectedCommunity])

  return (
    <div className='mb-2 flex items-center'>
      <ClickOutHandler onClickOut={() => {
        closeDropdown();
      }}>
      <div style={{borderRadius: '4px'}} className={`${activeClass ? 'shadow-xl' : 'shadow-none'} mr-4 relative box-border min-w-[300px] h-10 border solid bg-reddit_dark-brighter border-reddit_border`}>
          <div className={`flex items-center h-full px-2`}
          onClick={() => {
            openDropdown();
          }}
          >
            {!communityInfo?.communityAvatar && show 
              ? <BiSearch className="h-[22px] w-[22px] text-reddit_text-darker" /> 
              : !communityInfo.communityAvatar && !show 
              ? <span className='h-[22px] w-[22px] leading-[22px] text-[22px]' style={{boxSizing: 'border-box', borderRadius: '22px', border: '1px dashed', }} /> 
              : communityInfo?.communityAvatar && show 
              ? <BiSearch className="h-[22px] w-[22px] text-reddit_text-darker" /> 
              : <Image src={communityInfo.communityAvatar} width={22} height={22} className='rounded-full' alt='' />
            }
          <div className='flex-1 pl-2'>
            <input 
              spellCheck='false'
              className={`outline-none bg-reddit_dark-brighter text-[14px] leading-[18px] w-full align-middle bg-transparent placeholder:text-[#d7dadc] font-bold`}
              placeholder={show ? 'Search communities' : 'Choose a community'}
              value={selectedCommunity}
              onChange={(e) => {
                chooseCommunity(e)
              }}
            />
          </div>
          <HiChevronDown className="text-[20px] leading-5 align-middle cursor-pointer h-[20px] w-[20px] text-reddit_text-darker" />
          </div>
          {show && (
            <div className={'absolute z-30 w-[300px] overflow-hidden bg-reddit_dark-brighter'}>
              <div
                className={`max-h-[400px] overflow-y-scroll border solid bg-reddit_dark-brighter border-reddit_border`}
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
                    <CommunityList
                      key={community._id}
                      community={community}
                      setActiveClass={setActiveClass}
                      setShow={setShow}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
      </ClickOutHandler>
    </div>
  )
}

export default CommunityDropdown;

