import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { communityUrl } from '../../lib/url';
import { AuthModalContext, AuthModalContextProps } from '../auth/modal/AuthModalContext';
import { subscribe } from '../community/APicommunity';
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext';
import { postRequestHeaders } from '../main/config';
import { buttonClass } from '../utils/Button';

const BoardHeader = () => {
  const {
    loading,
    getCommunity,
    communityInfo
  } = useContext(CommunityContext) as CommunityContextProps;
  const authModal = useContext(AuthModalContext) as AuthModalContextProps;
  const [selectedFile, setSelectedFile] = useState<string | undefined>(communityInfo.communityAvatar)
  const filePickerRef = useRef<HTMLInputElement>(null)

  const previewFile = (file:File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result?.toString())
    }
  }

  const doSubscribe = async () => {
    const join = await subscribe(communityInfo.name, authModal.setShow)
    const refresh = await getCommunity(communityInfo.name)
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
      getCommunity(communityInfo.name);
      setSelectedFile('')
    } catch (err) {

    }
  }

  useEffect(() => {
    if (!selectedFile) return;
    changeAvatar()
  }, [selectedFile])

  return (
    <div className="z-10">
      <div
        className="no-repeat h-48 bg-cover"
        style={{
          backgroundImage: `url("${communityInfo.cover}")`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgb(0,108,189)',
          backgroundPosition: '50%',
        }}
      ></div>
      <div className="bg-reddit_dark-brighter">
        <div className="mx-5 flex">
          {!communityInfo.user_is_moderator && (
            <>
            <div className="relative -top-4 ml-0 h-[72px] w-[72px] overflow-hidden rounded-full border-4 border-white bg-reddit_blue lg:ml-40">
              {!loading && (
                <Image
                  src={communityInfo.communityAvatar}
                  alt="community header"
                  className="flex-none rounded-full"
                  layout="fill"
                />
              )}
            </div>
            </>
          )}
          {communityInfo.user_is_moderator && (
            <div className="relative -top-4 ml-0 cursor-pointer lg:ml-40" onClick={() => {
                filePickerRef?.current?.click()}
              }>
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border-4 border-white bg-reddit_blue">
                {!loading && (
                  <Image
                    src={communityInfo.communityAvatar}
                    alt="community_header"
                    className="flex-none rounded-full"
                    width={72}
                    height={72}
                  />
                )}
              </div>
              <span className="text-xs font-bold">Update icon</span>
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
            </div>
          )}
          <div className='flex mt-2'>
          <div className="ml-4">
            <p className="text-2xl font-bold">{communityInfo.name}</p>
            <h2 className="mt-1 text-sm text-reddit_text-darker">b/{communityInfo.name}</h2>
          </div>
          <button onClick={(e) => {
            e.preventDefault()
            doSubscribe()
          }} className={`${buttonClass(communityInfo.user_is_subscriber ? true : false)} h-[32px] mx-6 w-[96px] mt-1`}>
            <p>{communityInfo.user_is_subscriber ? "Joined" : "Join"}</p>
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardHeader;

