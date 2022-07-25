import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { EditTextarea } from 'react-edit-text'
import { buttonClass } from '../utils/Button'
import {
  MdOutlineAdminPanelSettings,
  MdOutlineModeEditOutline,
} from 'react-icons/md'
import moment from 'moment'
import Link from 'next/link'
import {AuthModalContext, AuthModalContextProps} from '../auth/AuthModalContext'
import UserContext from '../auth/UserContext'
import LoaderPlaceholder from '../post/LoaderPlaceholder'
import Image from 'next/image'
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext'

const CommunitiesInfo = () => {
  const {session} = useContext(UserContext)
  const {
    loading,
    communityInfo,
  } = useContext(CommunityContext) as CommunityContextProps;
  const [descr, setDescr] = useState('')

  const [commit, setCommit] = useState(false)

  const { user } = session ? session : { user: { username: '' } }
  const { setShow } = useContext(AuthModalContext) as AuthModalContextProps;

  useEffect(() => {
    if (commit) {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const data = { descr, name:communityInfo.name }
      axios.post(server + '/communities/edit/description', data, {withCredentials: true,})
        .then((response) => {
          setCommit(false)
        })
    }
  }, [commit])

  //TEXTAREA
  const handleSave = ({ name, value, previousValue }: any) => {
    setDescr(value)
    setCommit(true)
  }
  //

  return (
    <div className="mb-5 h-80 w-[310px] rounded-md border border-reddit_border bg-reddit_dark-brighter p-2">
      <div className="flex text-reddit_text-darker">
        <div className="self-center p-1">
          {loading && <LoaderPlaceholder extraStyles={{ height: '15px' }} />}
          {!loading && (
            <h1 className="text-[15px] font-bold">About community</h1>
          )}
        </div>
        {communityInfo.user_is_moderator && (
          <Link href={`/b/${communityInfo.name}/about/modqueue`}>
            <a className="ml-auto self-center">
              <div className="mt-1 flex self-center">
                <MdOutlineAdminPanelSettings className="h-6 w-6 self-center" />
                <span className="self-center p-1 text-xs font-bold">
                  MOD TOOLS
                </span>
              </div>
            </a>
          </Link>
        )}
      </div>
      <div>
        {loading && <LoaderPlaceholder extraStyles={{ height: '32px' }} />}
        {!loading && (
          <Link href={`/b/${communityInfo.name}`}>
            <a className="flex pt-3">
              <div className="">
                <Image
                  unoptimized
                  src={communityInfo.communityAvatar}
                  alt=""
                  height={32}
                  width={32}
                  className="flex-none rounded-full"
                />
              </div>
              <h3 className="mt-[4px] h-12 pl-2">b/{communityInfo.name}</h3>
            </a>
          </Link>
        )}
      </div>
      {communityInfo.user_is_moderator && !loading && (
        <div className="flex self-center border-reddit_text hover:border">
          <div className="w-full self-center overflow-hidden bg-black">
            <EditTextarea
              name={'description'}
              defaultValue={communityInfo.description}
              onSave={handleSave}
              inputClassName={
                'bg-reddit_dark-brighter break-words leading-6 overflow-hidden outline-none'
              }
              className="overflow-hidden break-words bg-reddit_dark-brighter leading-6 outline-none"
            />
          </div>
          <div className="self-center text-reddit_text-darker">
            <MdOutlineModeEditOutline className="h-6 w-6 self-center" />
          </div>
        </div>
      )}
      {!communityInfo.user_is_moderator && !loading && (
        <div className="flex">
          <div className="mb-2 overflow-hidden">
            <p className="resize-none break-words bg-reddit_dark-brighter leading-6 outline-none text-[15px]">
              {communityInfo.description}
            </p>
          </div>
        </div>
      )}

      <div>

        <hr className="border-reddit_border"></hr>
        <div className="py-3 text-sm">
          Created {moment(communityInfo.createdAt).format('MMM DD, YYYY')}
        </div>
        <hr className="border-reddit_border" />
      </div>
      <div className="self-center">
        {!user && (
          <button
            onClick={() => {
              setShow('login')
            }}
            className={`mt-3 w-full py-1${buttonClass()}`}
          >
            Create a Post
          </button>
        )}
        {user && (
          <Link href={`/submit`}>
            <a className="self-center">
              <div className="self-center">
                <button className={`mt-3 w-full py-1 ${buttonClass()}`}>Create a Post</button>
              </div>
            </a>
          </Link>
        )}
      </div>
      <hr className="border-reddit_border" />
    </div>
  )
}

export default CommunitiesInfo
