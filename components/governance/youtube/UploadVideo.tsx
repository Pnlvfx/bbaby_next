import { Dispatch, SetStateAction, useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { postRequestHeaders, server } from '../../main/config'
import { useMessage } from '../../main/TimeMsgContext'
import { buttonClass, Spinner } from '../../utils/Button'

type UploadVideoProps = {
  input?: InputProps
  setModalType: Dispatch<SetStateAction<'create_image' | 'create_video'>>
  setInput: Dispatch<SetStateAction<InputProps | undefined>>
}

const UploadVideo = ({ input, setModalType, setInput }: UploadVideoProps) => {
  const [loading, setLoading] = useState(false)
  const message = useMessage()

  const uploadVideo = async () => {
    try {
      if (!input) return
      setLoading(true)
      const body = JSON.stringify({
        title: input.title,
        description: input.description,
        tags: input.keywords,
        categoryId: input.category,
        privacyStatus: input.privacyStatus,
      })
      const url = `${server}/governance/youtube`
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      message.setMessage({ value: data.msg, status: 'success' })
      setModalType('create_image')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  if (!input) return null

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full text-sm">
      <video
        className={`aspect-video`}
        src={input.video}
        id="video_pre-share"
        poster={input.images[0]}
        controls={true}
        width={input.width}
        height={input.height}
      />
      <div id="flex w-full ml-3">
        <div id="set_title" className="mt-2 flex items-center">
          <p>Title:</p>
          <div className="w-full text-center">
            <textarea
              title="title"
              value={input.title}
              onChange={(e) => {
                setInput({ ...input, title: e.target.value })
              }}
              className="w-full bg-reddit_dark-brighter text-center text-[16px] font-bold"
            />
          </div>
        </div>
        <div id="set_description" className="mt-2 flex">
          <p>Description:</p>
          <div className="w-full">
            <textarea
              title="description"
              value={input.description}
              onChange={(e) => {
                setInput({ ...input, description: e.target.value })
              }}
              className="ml-3 max-h-[335px] min-h-[135px] w-full whitespace-pre-wrap bg-reddit_dark-brighter text-[16px] font-bold"
            />
          </div>
        </div>
        <div id="keywords" className="mt-2 flex">
          <p>Keywords:</p>
          <input
            type="text"
            title="keywords"
            value={input.keywords}
            onChange={(e) => setInput({ ...input, keywords: e.target.value })}
            className={`inputClass ml-auto font-bold`}
          />
        </div>
        <div id="category" className="mt-2 flex">
          <p className="">Category:</p>
          <input
            type="text"
            title="keywords"
            value={input.category}
            onChange={(e) => setInput({ ...input, category: e.target.value })}
            className={`inputClass ml-auto font-bold`}
          />
        </div>
        <div id="privacyStatus" className="mt-2 flex">
          <p>PrivacyStatus:</p>
          <input
            type="text"
            title="privacyStatus"
            value={input.privacyStatus}
            onChange={(e) => setInput({ ...input, privacyStatus: e.target.value })}
            className={`inputClass ml-auto font-bold`}
          />
        </div>
      </div>
      <div id="upload_video" className="mt-2 flex p-2">
        <div className="ml-auto">
          <button
            disabled={loading}
            className={`mb-3 ml-auto mr-5 h-7 w-40 ${buttonClass()}${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            type="submit"
            onClick={uploadVideo}
          >
            {loading && <Spinner />}
            {!loading && <p>Upload video</p>}
          </button>
        </div>
      </div>
    </form>
  )
}

export default UploadVideo
