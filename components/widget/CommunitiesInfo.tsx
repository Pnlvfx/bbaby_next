import axios from 'axios';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { EditTextarea } from 'react-edit-text';
import { buttonClass } from '../utils/Button';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineModeEditOutline,
  MdDateRange
} from 'react-icons/md';
import Link from 'next/link';
import {AuthModalContext, AuthModalContextProps} from '../auth/modal/AuthModalContext';
import UserContext from '../auth/UserContext';
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext';
import CategoriesDropdown from './community-info/CategoriesDropdown';
import { communityUrl } from '../../lib/url';
import {postRequestHeaders} from '../main/config';

export interface CommunitiesInfoProps {
  isCategoryDropdownOpen? : boolean
  setIsCategoryDropdownOpen? : Dispatch<SetStateAction<boolean>>
}

const CommunitiesInfo = ({isCategoryDropdownOpen,setIsCategoryDropdownOpen}:CommunitiesInfoProps) => {
  const {session} = useContext(UserContext) as SessionProps;
  const {
    loading,
    communityInfo,
  } = useContext(CommunityContext) as CommunityContextProps;
  const [descr, setDescr] = useState('')
  const [commit, setCommit] = useState(false)
  const { setShow } = useContext(AuthModalContext) as AuthModalContextProps;
  const [created,setCreated] = useState('')

  useEffect(() => {
    if (commit) {
      const data = { descr, name:communityInfo.name }
      axios({
        method: 'post',
        headers: postRequestHeaders,
        url: communityUrl.update_description,
        data,
        withCredentials: true
      })
        .then((response) => {
          setCommit(false)
        })
    }
  }, [commit])

  //TEXTAREA
  const handleSave = ({ name, value, previousValue }:any) => {
    setDescr(value)
    setCommit(true)
  }
  //

  useEffect(() => {   //CONSTRUCT DATA
    if (!communityInfo.createdAt) return;
    const date = new Date(communityInfo.createdAt)
    setCreated(date.toLocaleString('en-us', {day: 'numeric', month: 'short', year: 'numeric'}));
  },[communityInfo.createdAt])

  return (
    <div className="mb-5 min-h-[320px] w-[310px] rounded-md border border-reddit_border bg-reddit_dark-brighter overflow-hidden">
      <div className='mx-2'>
      <div className={`mt-1 flex items-center text-reddit_text-darker h-[30.5px] ${loading && "loading"}`}>
            {!loading && <p className={`text-[15px] font-bold p-1`}>About community</p>}
        {communityInfo.user_is_moderator && (  //MODQUEQUE BUTTON
          <Link href={`/b/${communityInfo.name}/about/modqueue`}>
            <a className="ml-auto">
              <div className="flex items-center space-x-1">
                <MdOutlineAdminPanelSettings className="h-6 w-6" />
                <span className="text-xs font-bold">MOD TOOLS</span>
              </div>
            </a>
          </Link>
        )}
      </div>
      {communityInfo.user_is_moderator && !loading && (
        <div className="flex items-center border-reddit_text hover:border mt-3 w-full">
            <EditTextarea
              name={'description'}
              defaultValue={communityInfo.description}
              onSave={handleSave}
              inputClassName={'bg-reddit_dark-brighter break-words leading-6 outline-none'}
              className="break-words bg-reddit_dark-brighter leading-6 outline-none"
            />
          <div className="text-reddit_text-darker">
            <MdOutlineModeEditOutline className="h-6 w-6" />
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
        <p className='font-bold'>{communityInfo.subscribers}</p>
        <p className='font-bold text-xs'>Fans</p>
        <hr className="border-reddit_border"></hr>
        {communityInfo.createdAt && 
        <div className="py-3 items-center space-x-2 w-full flex">
          <MdDateRange style={{width: 18,height: 18}} />
          <p className='text-sm'>Created {created}</p>
        </div>
        }
        <hr className="border-reddit_border" />
      </div>
      {communityInfo.user_is_moderator && 
      <CategoriesDropdown isCategoryDropdownOpen={isCategoryDropdownOpen} setIsCategoryDropdownOpen={setIsCategoryDropdownOpen} />}
      <div className="self-center">
        {!session && (
          <button
            onClick={() => {
              setShow('login')
            }}
            className={`mt-3 w-full h-[32px] ${buttonClass()}`}
          >
            Create a Post
          </button>
        )}
        {session && session.user.username && (
          <Link href={`/submit`}>
            <a className="self-center">
              <div className="self-center">
                <button className={`mt-3 w-full h-[32px] ${buttonClass()}`}>Create a Post</button>
              </div>
            </a>
          </Link>
        )}
      </div>
      <hr className="border-reddit_border" />
      </div>
    </div>
  )
}

export default CommunitiesInfo;

