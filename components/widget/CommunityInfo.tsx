import { useContext, useEffect, useState } from 'react'
import { buttonClass } from '../utils/buttons/Button'
import { MdOutlineAdminPanelSettings, MdDateRange } from 'react-icons/md'
import Link from 'next/link'
import { useAuthModal } from '../auth/modal/AuthModalContext'
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext'
import CategoriesDropdown from './community-info/CategoriesDropdown'
import { useMessage } from '../main/TimeMsgContext'
import { catchErrorWithMessage } from '../API/common'
import { useSession } from '../auth/UserContext'
import communityapis from '../API/communityapis'

const CommunityInfo = () => {
  const { session } = useSession()
  const { loading, communityInfo } = useContext(CommunityContext) as CommunityContextProps
  const [descr, setDescr] = useState('')
  const modalContext = useAuthModal()
  const message = useMessage()
  const [created, setCreated] = useState('')
  const [showTextarea, setShowTextarea] = useState(false)

  const updateDescription = async () => {
    try {
      await communityapis.updateDescription(communityInfo.name, descr)
      message.setMessage({ value: 'Description updated successfully!', status: 'success' })
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  //TEXTAREA
  const handleSave = ({ name, value, previousValue }: any) => {
    setDescr(value)
    updateDescription()
  }
  //

  useEffect(() => {
    //CONSTRUCT DATA
    if (!communityInfo.createdAt) return
    const date = new Date(communityInfo.createdAt)
    setCreated(date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' }))
  }, [communityInfo.createdAt])

  return (
    <>
      <div className={`flex p-3 pt-0 text-[10px] font-bold leading-3 text-reddit_text-darker ${loading && 'loading'}`}>
        <div className="pt-3 text-[16px] leading-5">
          <h2 className="inline text-[14px] font-bold leading-[18px]">About community</h2>
        </div>
        {communityInfo.user_is_moderator && ( //MODQUEQUE BUTTON
          <div tabIndex={0} className="m-auto mr-0 pt-[10px] align-middle">
            <Link href={`/b/${communityInfo.name.toLowerCase()}/about/modqueue`} className="inline-block p-1">
              <MdOutlineAdminPanelSettings className="icon mr-1 inline-block" />
              MOD TOOLS
            </Link>
          </div>
        )}
      </div>
      <div className="p-3">
        {!communityInfo.user_is_moderator && !loading && (
          <div className="mb-2">
            <div className="break-words text-[14px] leading-5">{descr}</div>
          </div>
        )}
        {communityInfo.user_is_moderator && !loading && (
          <div className="mb-3 mt-2 block rounded border border-reddit_border bg-reddit_dark-brightest p-2 transition-all" tabIndex={0}>
            <div
              className="text-[12px] font-bold leading-4"
              onClick={() => {
                setShowTextarea(true)
              }}
            >
              {showTextarea ? (
                <textarea className="w-full resize-none bg-transparent" placeholder="Tell us about your community  " />
              ) : (
                <>{communityInfo.description}</>
              )}
            </div>
          </div>
        )}
        <div className="grid">
          <p className="font-bold">{communityInfo.subscribers}</p>
          <p className="text-xs font-bold">Followers</p>
          <hr className="border-reddit_border"></hr>
          {communityInfo.createdAt && (
            <div className="flex w-full items-center space-x-2 py-3">
              <MdDateRange style={{ width: 18, height: 18 }} />
              <p className="text-sm">Created {created}</p>
            </div>
          )}
        </div>
        {communityInfo.user_is_moderator && <CategoriesDropdown />}
        <div className="self-center">
          {!session?.user && (
            <button
              onClick={() => {
                modalContext.setShow('login')
              }}
              className={`mt-3 h-[32px] w-full ${buttonClass()}`}
            >
              Create a Post
            </button>
          )}
          {session?.user?.username && (
            <Link href={`/submit`} className="self-center">
              <div className="self-center">
                <button className={`mt-3 h-[32px] w-full ${buttonClass()}`}>Create a Post</button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default CommunityInfo
