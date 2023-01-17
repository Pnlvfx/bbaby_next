import { Dispatch, SetStateAction, useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { postRequestHeaders, server } from '../../main/config'
import { useMessage } from '../../main/TimeMsgContext'
import { buttonClass, Spinner } from '../../utils/Button'

interface CreateVideoProps {
  input?: InputProps
  setInput: Dispatch<SetStateAction<InputProps | undefined>>
}

const CreateVideo = ({ input, setInput }: CreateVideoProps) => {
  const _videoOptions = {
    fps: '24',
    transition: 'false',
    transitionDuration: '0', // seconds
  }

  const [videoOptions, setVideoOptions] = useState<VideoOptionsProps>(_videoOptions)
  const [imageIndex, setImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const message = useMessage()

  const createVideo = async () => {
    try {
      if (!input?.localImages) return
      setLoading(true)
      const body = JSON.stringify({ _videoOptions: videoOptions, images: input.localImages })
      const url = `${server}/governance/create-video`
      const res = await fetch(url, {
        method: 'post',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok) {
        message.setMessage({ value: data?.msg, status: 'success' })
        setInput({ ...input, video: data.video })
      } else {
        message.setMessage({ value: data?.msg, status: 'error' })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  const changeImage = () => {
    if (input?.images && imageIndex !== input.images.length - 1) {
      setImageIndex(imageIndex + 1)
    } else {
      setImageIndex(0)
    }
  }

  return (
    <div className="flex p-2">
      <form className="w-full text-center text-sm">
        {input?.images && (
          <div id="image" className="flex max-h-[520px] cursor-pointer items-center justify-center overflow-hidden" onClick={changeImage}>
            <picture>
              <img src={input.images[imageIndex]} alt="Video Image" width={input.width} height={input.height} />
            </picture>
          </div>
        )}
        <div id="fps" className="mt-2 flex items-center">
          <p className="">Fps:</p>
          <input
            type="number"
            title="fps"
            value={videoOptions.fps}
            onChange={(e) =>
              setVideoOptions({
                ...videoOptions,
                fps: e.target.value,
              })
            }
            className={`inputClass ml-auto font-bold`}
          />
        </div>
        <div id="transition" className="mt-2 flex">
          <p className="">Transition:</p>
          <input
            type="text"
            title="transition"
            value={videoOptions.transition}
            onChange={(e) => {
              setVideoOptions({
                ...videoOptions,
                transition: e.target.value,
              })
            }}
            className={`inputClass ml-auto font-bold`}
          />
        </div>
        <div id="transition_duration" className="mt-2 flex">
          <p className="">Transition_duration:</p>
          <input
            type="text"
            title="transition_duration"
            value={videoOptions.transitionDuration}
            onChange={(e) =>
              setVideoOptions({
                ...videoOptions,
                transitionDuration: e.target.value,
              })
            }
            className={`inputClass ml-auto font-bold`}
          />
        </div>
        <hr className="mt-4 border-reddit_border" />
        {input?.finalAudio && (
          <div id="audio" className="mt-2 flex">
            <p className="">Audio:</p>
            <div className="ml-auto">
              <audio controls src={input.finalAudio} />
            </div>
          </div>
        )}
        <div id="create_video" className="mt-2 flex p-2">
          <div className="ml-auto">
            <>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  createVideo()
                }}
                className={`mb-3 ml-auto mr-5 h-7 w-40 ${buttonClass()}`}
              >
                {loading && <Spinner />}
                {!loading && <p>Create Video</p>}
              </button>
            </>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateVideo
