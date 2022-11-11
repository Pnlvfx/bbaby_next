import { useContext, useEffect, useState } from 'react';
import { buttonClass } from '../utils/Button';
import { MdOutlineAdminPanelSettings, MdDateRange } from 'react-icons/md';
import Link from 'next/link';
import { useAuthModal} from '../auth/modal/AuthModalContext';
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext';
import CategoriesDropdown from './community-info/CategoriesDropdown';
import { communityUrl } from '../../lib/url';
import {postRequestHeaders} from '../main/config';
import { useMessage } from '../main/TimeMsgContext';
import { catchErrorWithMessage } from '../API/common';
import { useSession } from '../auth/UserContext';

const CommunitiesInfo = () => {
  const {session} = useSession();
  const {loading, communityInfo } = useContext(CommunityContext) as CommunityContextProps;
  const [descr, setDescr] = useState('');
  const modalContext = useAuthModal();
  const message = useMessage();
  const [created, setCreated] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);

  const updateDescription = async () => {
    try {
      const body = JSON.stringify({descr, name: communityInfo.name});
      const res = await fetch(communityUrl.update_description, {
        method:  'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include'
      })
      const data = await res.json()
      if (!res.ok) {
        catchErrorWithMessage(data?.msg, message);
      } else {
        message.setMessage({value: 'Description updated successfully!', status: 'success'})
      }
    } catch (err) {
      catchErrorWithMessage(err, message);
    }
  }

  //TEXTAREA
  const handleSave = ({ name, value, previousValue }: any) => {
    setDescr(value);
    updateDescription();
  }
  //

  useEffect(() => {   //CONSTRUCT DATA
    if (!communityInfo.createdAt) return;
    const date = new Date(communityInfo.createdAt)
    setCreated(date.toLocaleString('en-us', {day: 'numeric', month: 'short', year: 'numeric'}));
  },[communityInfo.createdAt]);

  return (
    <>
      <div className={`text-[10px] font-bold leading-3 flex p-3 pt-0 text-reddit_text-darker ${loading && "loading"}`}>
        <div className='text-[16px] leading-5 pt-3'>
          <h2 className='text-[14px] leading-[18px] font-bold inline'>About community</h2>
        </div>
        {communityInfo.user_is_moderator && (  //MODQUEQUE BUTTON
          <div tabIndex={0} className='m-auto mr-0 align-middle pt-[10px]'>
            <Link 
              href={`/b/${communityInfo.name.toLowerCase()}/about/modqueue`}
              className="p-1 inline-block"
            >
              <MdOutlineAdminPanelSettings className="icon mr-1 inline-block" />
              MOD TOOLS
            </Link>
          </div>
        )}
      </div>
      <div className='p-3'>
      {!communityInfo.user_is_moderator && !loading && (
        <div className="mb-2">
          <div className="text-[14px] leading-5 break-words">{descr}</div>
        </div>
      )}
      {communityInfo.user_is_moderator && !loading && (
        <div
          className="transition-all block bg-reddit_dark-brightest rounded p-2 mb-3 mt-2 border border-reddit_border"
          tabIndex={0}
        >
          <div
            className="font-bold leading-4 text-[12px]"
            onClick={() => {
              setShowTextarea(true);
            }}
          >
            {showTextarea ? (
            <textarea 
              className='bg-transparent w-full resize-none'
              placeholder='Tell us about your community  '
            />
            ) : (
              <>
              {communityInfo.description}
              </>
            )}
          </div>
        </div>
      )}
      <div className='grid'>
        <p className='font-bold'>{communityInfo.subscribers}</p>
        <p className='font-bold text-xs'>Followers</p>
        <hr className="border-reddit_border"></hr>
        {communityInfo.createdAt && 
        <div className="py-3 items-center space-x-2 w-full flex">
          <MdDateRange style={{width: 18,height: 18}} />
          <p className='text-sm'>Created {created}</p>
        </div>
        }
      </div>
        {communityInfo.user_is_moderator && 
        <CategoriesDropdown />}
        <div className="self-center">
          {!session?.user && (
            <button
              onClick={() => {
                modalContext.setShow('login')
              }}
              className={`mt-3 w-full h-[32px] ${buttonClass()}`}
            >
              Create a Post
            </button>
          )}
          {session?.user?.username && (
            <Link href={`/submit`} className='self-center'>
              <div className="self-center">
                <button className={`mt-3 w-full h-[32px] ${buttonClass()}`}>Create a Post</button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default CommunitiesInfo;

