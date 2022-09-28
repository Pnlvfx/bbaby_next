import { useState, useRef, useContext, useEffect, ChangeEvent } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Image from 'next/image';
import { TimeMsgContext, TimeMsgContextProps } from '../main/TimeMsgContext';
import { postRequestHeaders } from '../main/config';
import { catchErrorWithMessage } from '../API/common';
import { useSession } from '../auth/UserContext';

const Profile = () => {
  const { session } = useSession();
  const [selectedFile, setSelectedFile] = useState(session?.user?.avatar)
  const [change, setChange] = useState(false)
  const filePickerRef = useRef<HTMLInputElement>(null)
  const message = useContext(TimeMsgContext) as TimeMsgContextProps

  const handleFileInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e?.target?.files?.length > 0) {
        const file = e?.target?.files[0]
        previewFile(file)
    }
  }

  const previewFile = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result?.toString())
      setChange(true)
    }
  }

  const changeUserAvatar = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/user/change_avatar`;
      const body = JSON.stringify({ image: selectedFile, username: session?.user?.username });
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: postRequestHeaders,
        body,
      })
      const data = await res.json();
      if (!res.ok) {
        message.setMessage({value: data?.msg, status: 'error'})
      } else {
        setChange(false);
        message.setMessage({value: data.success, status: 'success'})
      }
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  useEffect(() => {
    if (!change) return;
    changeUserAvatar();
  }, [change])

  return (
    <div className='max-w-[800px] font-semibold space-y-6 mt-6'>
        <p className="text-[19px]">Costumize profile</p>
        <div>
          <p className="text-[11px] text-reddit_text-darker">PROFILE INFORMATION</p>
          <hr className="border-reddit_border mt-1" />
        </div>
      <div className='space-y-4'>
        <div>
          <p className="text-[11px] text-reddit_text-darker">IMAGES</p>
          <hr className="mt-1 border-reddit_border" />
        </div>
        <div>
          <p className="text-sm font-bold">Avatar and banner image</p>
          <p className="text-sm text-reddit_text-darker">Images must be .png or .jpg format</p>
        </div>
      </div>
      <div className="">
        {selectedFile && (
          <div
            onClick={() => {
                filePickerRef && filePickerRef?.current?.click()
            }}
            className="relative flex h-36 w-36 cursor-pointer overflow-hidden rounded-full bg-reddit_dark-brightest"
          >
            <Image src={selectedFile} layout="fill" alt="user_image" />
            <AiOutlinePlus className="absolute mx-[95px] mt-[100px] h-8 w-8 text-reddit_text-darker" />
          </div>
        )}
        <input
          className='text-[16px]'
          hidden
          accept='image/png, image/jpeg'
          type="file"
          name="image"
          id="file_up"
          ref={filePickerRef}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  )
}

export default Profile;

