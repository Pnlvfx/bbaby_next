import { useState } from 'react';
import CreateImage from './CreateImage';
import UploadVideo from './UploadVideo';
import CreateVideo from './CreateVideo';

const Youtube = () => {
  const _videoOptions = {
    fps: '24',
    transition: 'false',
    transitionDuration: '0', // seconds
  }
  const _input = {
    images: [],
    video: '',
    localImages: [],
    audio: [],
    finalAudio: '',
    height: 0,
    width: 0,
    title: '',
    description: '',
    keywords: '',
    category: '',
    privacyStatus: '',
    msg: ''
  }
  const [videoOptions, setVideoOptions] = useState<VideoOptionsProps>(_videoOptions);
  const [input, setInput] = useState<InputProps>(_input);
  const [modalType, setModalType] = useState<modalType>('create_image');

  return (
      <div className='flex mt-4 justify-center'>
        <div className="w-full flex-none text-center lg:w-10/12 xl:w-8/12 2xl:w-[1050px]">
          <div className="rounded-t-md border border-reddit_border bg-reddit_dark-brighter p-2">
          {modalType === 'create_image' && (
            <CreateImage
              setModalType={setModalType}
              setInput={setInput}
            />
          )}
          {modalType === 'create_video' && (
            <>
              {!input.video && (
                <CreateVideo
                  input={input}
                  setInput={setInput}
                  videoOptions={videoOptions}
                  setVideoOptions={setVideoOptions}
                />
              )}
              {input.video && (
                <UploadVideo
                  input={input}
                  setInput={setInput}
                  setModalType={setModalType}
                />
              )}
            </>
          )}
          </div>
        </div>
      </div>
  )
}

export default Youtube;

