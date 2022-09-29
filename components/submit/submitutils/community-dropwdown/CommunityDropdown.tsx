import style from './community-dropdown.module.css';
import Image from 'next/future/image';
import { useContext, useEffect, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import { HiChevronDown } from 'react-icons/hi';
import { useSession } from '../../../auth/UserContext';
import { getCommunities, getUserPrefCommunities, searchCommunity } from '../../../API/communityAPI';
import { CommunityContext, CommunityContextProps } from '../../../community/CommunityContext';
import { SubmitContext, SubmitContextType } from '../../SubmitContext';
import CommunityList from './CommunityList';
import {BiSearch} from 'react-icons/bi';

const CommunityDropdown = () => {
  const { session } = useSession();
  const [show, setShow] = useState(false)
  const [activeClass, setActiveClass] = useState(false)
  const [allCommunity, setAllCommunity] = useState<CommunityProps[] | []>([])
  const { selectedCommunity, setSelectedCommunity } = useContext(SubmitContext) as SubmitContextType
  const { getCommunity, communityInfo, setShow:setShowCommunityForm } = useContext(CommunityContext) as CommunityContextProps

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
    if (!session?.user) return;
    if (selectedCommunity) {
      getCommunity(selectedCommunity)
    } else {
      setTimeout(async () => {
        let communities = await getUserPrefCommunities();
        if (communities.length <= 0) {
          communities = await getCommunities(11);
        }
        setAllCommunity(communities);
      }, 250)
    }
  },[])

  useEffect(() => { ///SEARCH
    if (!session?.user) return;
    if (!selectedCommunity) return;
    const timer = setTimeout(() => {
      searchCommunity(selectedCommunity).then((res) => {
        setAllCommunity(res);
      })
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  },[selectedCommunity, session])

  return (
    <div className={style.dropdownContainer}>
      <ClickOutHandler onClickOut={() => {
        closeDropdown();
      }}>
      <div className={`${style.dropdownContainer2} ${activeClass && style.opendropdownContainer2} lg:min-w-[300px]`}>
          <div 
            className={`flex items-center h-full px-2`}
            onClick={() => {
              openDropdown();
            }}
          >
          {!communityInfo?.communityAvatar && show 
            ? <BiSearch className="h-[22px] w-[22px] text-reddit_text-darker" /> 
            : !communityInfo.communityAvatar && !show 
            ? <span className='h-[22px] w-[22px] leading-[22px] text-[22px] box-border rounded-[22px] border border-dashed' /> 
            : communityInfo?.communityAvatar && show 
            ? <BiSearch className="h-[22px] w-[22px] text-reddit_text-darker" /> 
            : <Image 
                src={communityInfo.communityAvatar} 
                width={22} 
                height={22} 
                className='rounded-full' 
                alt='Community Icon'
              />
          }
            <div className='flex-1 pl-2'>
              <input 
                spellCheck='false'
                className={`outline-none bg-reddit_dark-brighter text-[16px] md:text-[14px] leading-[18px] w-full align-middle bg-transparent placeholder:text-[#d7dadc] font-medium`}
                placeholder={show ? 'Search communities' : 'Choose a community'}
                value={selectedCommunity}
                onChange={(e) => {
                  chooseCommunity(e)
                }}
              />
            </div>
              <HiChevronDown className="text-[20px] leading-5 align-middle cursor-pointer h-[22px] w-[22px] text-reddit_text-darker" />
            </div>
            {show && (
              <div className={'absolute z-30 w-[300px] overflow-hidden bg-reddit_dark-brighter'}>
                <div
                  className={`max-h-[400px] overflow-y-scroll border solid bg-reddit_dark-brighter border-reddit_border`}
                >
                  <div className="text-sm font-bold p-3">
                    <p className="px-2 py-1 text-[11px] font-bold text-reddit_text-darker">YOUR PROFILE</p>
                      {session?.user && (
                        <button className="flex w-full items-center space-x-2 my-1 hover:bg-reddit_dark-brightest">
                          <div className='border rounded-md overflow-hidden border-reddit_border'>
                          <Image
                            src={session.user.avatar}
                            alt="User Icon"
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

