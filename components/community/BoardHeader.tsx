import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { communityUrl } from '../../lib/url';
import { AuthModalContext, AuthModalContextProps } from '../auth/modal/AuthModalContext';
import { subscribe } from '../API/communityAPI';
import { CommunityContext, CommunityContextProps } from './CommunityContext';
import { postRequestHeaders } from '../main/config';
import { buttonClass } from '../utils/Button';
import Link from 'next/link';

const BoardHeader = () => {
  const {
    loading,
    refreshCommunity,
    communityInfo
  } = useContext(CommunityContext) as CommunityContextProps;
  const authModal = useContext(AuthModalContext) as AuthModalContextProps;
  const [selectedFile, setSelectedFile] = useState<string | undefined>(communityInfo.communityAvatar)
  const filePickerRef = useRef<HTMLInputElement>(null)

  const previewFile = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result?.toString())
    }
  }

  const doSubscribe = async () => {
    const join = await subscribe(communityInfo.name, authModal.setShow);
    const refresh = await refreshCommunity(communityInfo.name);
  }

  const changeAvatar = async () => {
    try {
      const url = communityUrl.change_avatar(communityInfo.name);
      const body = JSON.stringify({ image: selectedFile })
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: postRequestHeaders,
        credentials: 'include'
      })
      refreshCommunity(communityInfo.name);
      setSelectedFile('')
    } catch (err) {

    }
  }

  useEffect(() => {
    if (!selectedFile) return;
    changeAvatar()
  }, [selectedFile])

  return (
    <>
      <span
        className={`p-2 px-4 block flex-row mx-auto min-w-[260px]`}
        style={{
          background: `url(${communityInfo.cover}) center center / cover no-repeat rgb(0, 108, 189)`,
          filter: 'none',
          height: '228px'
        }}
      >
        <Link href={`/b/${communityInfo.name?.toLowerCase()}`}>
          <div className='max-w-[1200px] h-full m-auto relative'>
            <div className='left-[50%] h-[176px]' style={{transform: 'translate(-50%, -50%)'}}>
              {communityInfo.name}
            </div>
          </div>
        </Link>
      </span>
      <div className="bg-reddit_dark-brighter block w-full">
        <div className="flex items-start flex-col justify-between mx-auto pr-4 pl-6 max-w-[984px]">
          <div className='mb-3 mt-[-14px] flex items-start relative'>
              <div 
                className={`${communityInfo.user_is_moderator && 'cursor-pointer'}`}
                onClick={() => {
                  communityInfo.user_is_moderator && 
                  filePickerRef?.current?.click()}
                }
              >
                {!loading && (
                  <Image
                    src={communityInfo.communityAvatar}
                    alt="community header"
                    className="bg-white bg-cover rounded-full border-4 border-solid border-white"
                    width={72}
                    height={72}
                  />
                )}
              {/* <span className="text-xs font-bold">Update icon</span> */}
              {communityInfo.user_is_moderator && 
               <input
                className='text-[16px]'
                hidden
                type="file"
                name="image"
                accept='image/png, image/jpeg'
                id="file_up"
                ref={filePickerRef}
                onChange={(e) => {
                  e.preventDefault()
                  if (!e.target.files) return;
                  const file = e.target.files[0]
                  previewFile(file)
                }}
              />
              }
            </div>
            <div className='box-border items-start inline-flex flex-1 pl-4 mt-6 justify-between relative w-[calc(100%_-_80px)]'>
              <div className="inline-block max-w-[calc(100%_-_96px)] pr-6 box-border">
                <h1 className="inline-block flex-1 text-[28px] font-bold leading-8 overflow-hidden pr-[2px] pb-[4px] text-ellipsis w-full">{communityInfo.name}</h1>
                <h2 className="text-[14px] leading-[18px] text-reddit_text-darker">b/{communityInfo.name}</h2>
              </div>
              <div className='flex'>
                <div className='w-[96px]'>
                  <button
                    role={'button'}
                    tabIndex={0}
                    className={`${buttonClass(communityInfo.user_is_subscriber ? true : false)} w-full relative ${communityInfo.user_is_subscriber ? '' : 'border-none'} text-[14px] font-bold min-h-[32px] min-w-[32px] items-center rounded-full box-border flex justify-center text-center`}
                    onClick={(e) => {
                      e.preventDefault()
                      doSubscribe()
                    }}
                  >
                    {communityInfo.user_is_subscriber ? "Joined" : "Join"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BoardHeader;

