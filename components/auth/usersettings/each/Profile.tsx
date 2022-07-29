import { useState, useRef, useContext, useEffect, ChangeEvent } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import UserContext from '../../UserContext'
import Image from 'next/image'
import axios from 'axios'
import {
  TimeMsgContext,
  TimeMsgContextProps,
} from '../../../main/TimeMsgContext'

const Profile = () => {
  const { session } = useContext(UserContext)
  const [selectedFile, setSelectedFile] = useState(session?.user.avatar)
  const [change, setChange] = useState(false)
  const filePickerRef = useRef<HTMLInputElement>(null)
  const { setMessage } = useContext(TimeMsgContext) as TimeMsgContextProps

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

  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    try {
      if (!change) return
      const data = { image: selectedFile, username: session?.user.username }
      axios({
        method: 'POST',
        url: server + '/user/change_avatar',
        data: data,
        headers: { 'Content-type': 'application/json' },
      }).then((res) => {
        setChange(false)
        setMessage({ value: res.data.success, status: 'success' })
      })
    } catch (err: any) {
      err.response.data.msg &&
        setMessage({ value: err?.response.data.msg, status: 'error' })
    }
  }, [change])

  return (
    <>
      <div>
        <p className="py-4 px-5 text-[19px] font-semibold">
          Costumize profile
        </p>
        <h2 className=" px-4 pt-4 pb-1 text-[11px] font-bold text-reddit_text-darker">
          PROFILE INFORMATION
        </h2>
        <hr className="mx-4 w-1/2 border-reddit_border" />
      </div>
      <div>
        <p className="px-4 pt-4 pb-1 text-[11px] font-bold text-reddit_text-darker">
          IMAGES
        </p>
        <hr className="mx-4 w-1/2 border-reddit_border" />
        <p className="p-4 pt-6 pb-0 text-sm font-bold">
          Avatar and banner image
        </p>
        <p className="p-4 pt-0 text-sm text-reddit_text-darker">
          Images must be .png or .jpg format
        </p>
      </div>
      <div className="p-6">
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
          hidden
          type="file"
          name="image"
          id="file_up"
          ref={filePickerRef}
          onChange={handleFileInputChange}
        />
      </div>
    </>
  )
}

export default Profile;

