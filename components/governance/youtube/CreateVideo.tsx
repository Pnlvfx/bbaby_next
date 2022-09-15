import { inputClass } from '../../utils/Input'
import { FaPause, FaPlay } from 'react-icons/fa'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import ReactHowler from 'react-howler'

interface CreateVideoProps {
  setVideoOptions: Dispatch<SetStateAction<VideoOptionsProps>>
  input: InputProps
  setInput: Dispatch<SetStateAction<InputProps>>
  videoOptions: VideoOptionsProps
}

const CreateVideo = ({
  setVideoOptions,
  input,
  setInput,
  videoOptions,
}: CreateVideoProps) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <div className="bg-reddit_dark-brighter">
        <div className="flex p-2">
          {!input?.video && (
            <form className="w-full text-sm text-center">
              <div id='image'
                onClick={() => {
                  if (imageIndex !== input.images.length - 1) {
                    setImageIndex(imageIndex + 1)
                  } else {
                    setImageIndex(0)
                  }
                }}
                className="cursor-pointer max-h-[520px] overflow-hidden"
              >
                <Image
                  src={input.images[imageIndex]}
                  alt=""
                  width={input.width}
                  height={input.height}
                  unoptimized
                />
              </div>
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
                  className={`${inputClass} font-bold ml-auto`}
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
                  className={`${inputClass} ml-auto font-bold`}
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
                  className={`${inputClass} ml-auto font-bold`}
                />
              </div>
              <hr className="mt-4 border-reddit_border" />
              <div id="audio" className="mt-2 flex">
                <p className="">Audio:</p>
                <div className="ml-auto">
                  <ReactHowler
                    src={input.finalAudio}
                    playing={isPlaying}
                    onEnd={() => setIsPlaying(false)}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setIsPlaying(!isPlaying)
                    }}
                  >
                    {!isPlaying && <FaPlay className="h-6 w-6" />}
                    {isPlaying && <FaPause className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </form>
          )}
          {input?.video && (
            <form className="w-full text-sm text-center flex">
              <video
                className={`aspect-video`}
                src={input.video}
                id="video_pre-share"
                poster={input.images[0]}
                controls={true}
                width={input.width}
                height={input.height}
              />
              <div id='flex' style={{width: '100%', marginLeft: 12}} >
                <div id="set_title" className="mt-2 flex items-center">
                  <p>Title:</p>
                  <div className='w-full text-center'>
                    <textarea
                      title="title"
                      value={input.title}
                      onChange={(e) => {
                        setInput({ ...input, title: e.target.value })
                      }}
                      className="w-full text-center bg-reddit_dark-brighter font-bold text-[16px]"
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
                      className="whitespace-pre-wrap max-h-[335px] min-h-[135px] ml-3 w-full bg-reddit_dark-brighter font-bold text-[16px]"
                    />
                  </div>
                </div>
                <div id="keywords" className="mt-2 flex">
                  <p>Keywords:</p>
                  <input
                    type="text"
                    title="keywords"
                    value={input.keywords}
                    onChange={(e) =>
                      setInput({ ...input, keywords: e.target.value })
                    }
                    className={`ml-auto font-bold ${inputClass}`}
                  />
                </div>
                <div id="category" className="mt-2 flex">
                  <p className="">Category:</p>
                  <input
                    type="text"
                    title="keywords"
                    value={input.category}
                    onChange={(e) =>
                      setInput({ ...input, category: e.target.value })
                    }
                    className={`ml-auto font-bold ${inputClass}`}
                  />
                </div>
                <div id="privacyStatus" className="mt-2 flex">
                  <p>PrivacyStatus:</p>
                  <input
                    type="text"
                    title="privacyStatus"
                    value={input.privacyStatus}
                    onChange={(e) =>
                      setInput({ ...input, privacyStatus: e.target.value })
                    }
                    className={`ml-auto font-bold ${inputClass}`}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateVideo;
