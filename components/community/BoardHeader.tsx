import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAuthModal } from '../auth/modal/AuthModalContext'
import communityapis from '../API/communityapis'
import { CommunityContext, CommunityContextProps } from './CommunityContext'
import { buttonClass } from '../utils/buttons/Button'
import Link from 'next/link'

const BoardHeader = () => {
  const { loading, refreshCommunity, communityInfo } = useContext(CommunityContext) as CommunityContextProps
  const authModal = useAuthModal()
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
    try {
      await communityapis.subscribe(communityInfo.name, authModal.setShow)
      await refreshCommunity(communityInfo.name)
    } catch (err) {
      console.log(err)
    }
  }

  const changeAvatar = async () => {
    try {
      if (!selectedFile) return
      await communityapis.changeAvatar(communityInfo.name, selectedFile)
      refreshCommunity(communityInfo.name)
      setSelectedFile('')
    } catch (err) {}
  }

  useEffect(() => {
    changeAvatar()
  }, [selectedFile])

  return (
    <>
      <span
        className={`mx-auto block min-w-[260px] flex-row p-2 px-4`}
        style={{
          background: `url(${communityInfo.cover}) center center / cover no-repeat rgb(0, 108, 189)`,
          filter: 'none',
          height: '228px',
        }}
      >
        <Link href={`/b/${communityInfo.name?.toLowerCase()}`}>
          <div className="relative m-auto h-full max-w-[1200px]">
            <div className="left-[50%] h-[176px]" style={{ transform: 'translate(-50%, -50%)' }}>
              {communityInfo.name}
            </div>
          </div>
        </Link>
      </span>
      <div className="block w-full bg-reddit_dark-brighter">
        <div className="mx-auto flex max-w-[984px] flex-col items-start justify-between pr-4 pl-6">
          <div className="relative mb-3 mt-[-14px] flex items-start">
            <div
              className={`${communityInfo.user_is_moderator && 'cursor-pointer'}`}
              onClick={() => {
                communityInfo.user_is_moderator && filePickerRef?.current?.click()
              }}
            >
              {!loading && (
                <Image
                  src={communityInfo.communityAvatar}
                  alt="community header"
                  className="rounded-full border-4 border-solid border-white bg-white bg-cover"
                  width={72}
                  height={72}
                />
              )}
              {/* <span className="text-xs font-bold">Update icon</span> */}
              {communityInfo.user_is_moderator && (
                <input
                  className="text-[16px]"
                  hidden
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  id="file_up"
                  ref={filePickerRef}
                  onChange={(e) => {
                    e.preventDefault()
                    if (!e.target.files) return
                    const file = e.target.files[0]
                    previewFile(file)
                  }}
                />
              )}
            </div>
            <div className="relative mt-6 box-border inline-flex w-[calc(100%_-_80px)] flex-1 items-start justify-between pl-4">
              <div className="box-border inline-block max-w-[calc(100%_-_96px)] pr-6">
                <h1 className="inline-block w-full flex-1 overflow-hidden text-ellipsis pr-[2px] pb-[4px] text-[28px] font-bold leading-8">
                  {communityInfo.name}
                </h1>
                <h2 className="text-[14px] leading-[18px] text-reddit_text-darker">b/{communityInfo.name}</h2>
              </div>
              <div className="flex">
                <div className="w-[96px]">
                  <button
                    role={'button'}
                    tabIndex={0}
                    className={`${buttonClass(communityInfo.user_is_subscriber ? true : false)} relative w-full ${
                      communityInfo.user_is_subscriber ? '' : 'border-none'
                    } box-border flex min-h-[32px] min-w-[32px] items-center justify-center rounded-full text-center text-[14px] font-bold`}
                    onClick={(e) => {
                      e.preventDefault()
                      doSubscribe()
                    }}
                  >
                    {communityInfo.user_is_subscriber ? 'Joined' : 'Join'}
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

export default BoardHeader
