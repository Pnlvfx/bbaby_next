import Image from 'next/image'
import { useContext, useState } from 'react'
import ClickOutHandler from 'react-clickout-ts'
import { HiChevronDown } from 'react-icons/hi'
import { MdOutlineCircle } from 'react-icons/md'
import UserContext from '../../auth/UserContext'
import { getCommunities } from '../../community/APicommunity'
import Input from '../../utils/Input'
import { SubmitContext, SubmitContextType } from '../SubmitContext'
import CommunityList from './CommunityList'

const CommunityDropdown = () => {
  const { session } = useContext(UserContext)
  const [show, setShow] = useState(false)
  const [activeClass, setActiveClass] = useState(false)
  const [allCommunity, setAllCommunity] = useState<CommunityProps[] | []>([])
  const { selectedCommunity, setSelectedCommunity } = useContext(
    SubmitContext
  ) as SubmitContextType

  const chooseCommunity = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedCommunity(e?.currentTarget.value)
  }

  return (
    <>
      <ClickOutHandler
        onClickOut={() => {
          setShow(false)
          setActiveClass(false)
        }}
      >
        <div
          className={`w-[300px] overflow-hidden rounded-md border-reddit_border ${
            activeClass ? 'border-x-2 border-t-2 border-b' : 'border'
          }`}
        >
          <button
            value={'choose a community'}
            onClick={() => {
              setActiveClass(true)
              getCommunities().then(res => {
              setAllCommunity(res)
              setShow(!show)
              })
            }}
            className={'flex h-[38px] w-[300px] bg-reddit_dark-brighter'}
          >
            <MdOutlineCircle className="mx-2 h-8 w-8 self-center text-reddit_text-darker" />
            <Input
              className="h-full w-full self-center text-sm outline-none placeholder:text-gray-300"
              placeholder={show ? 'Search communities' : 'Choose a community'}
              value={selectedCommunity}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                chooseCommunity(e)
              }
            />
            <HiChevronDown className="mr-2 h-8 w-8 self-center text-reddit_text-darker" />
          </button>
        </div>
        {show && (
          <div
            className={
              'absolute z-30 w-[300px] overflow-hidden bg-reddit_dark-brighter'
            }
          >
            <div
              className={`border-t-none max-h-[400px] overflow-y-scroll border-reddit_border ${
                activeClass ? 'border-x-2 border-b-2' : ''
              }`}
            >
              <div className="text-sm font-bold p-3">
                <p className="px-2 py-1 text-[11px] font-bold text-reddit_text-darker">
                  YOUR PROFILE
                </p>
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
                    <button className='ml-auto mr-1'>
                      <p className='text-[13px] font-bold'>Create new</p>
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

export default CommunityDropdown
