import { ChangeEvent, useContext, useRef } from 'react';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { VideoIcon } from '../../utils/SVG';
import { SubmitContext, SubmitContextType } from '../SubmitContext';

const AddVideo = () => {
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const containerClass = 'p-2 text-reddit_text-darker'
  const { setSelectedFile,selectedFile, setIsVideo, setWidth, setHeight, setIsImage } = useContext(SubmitContext) as SubmitContextType;
  const fileVideoRef = useRef<HTMLInputElement>(null)
  const addVideoToPost = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return setMessage({value: 'Please select at least one video.', status: 'error'})
    const file = e?.target?.files[0]
    previewVideo(file)
  }
  const previewVideo = (file: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const video_url = event.target?.result
      let video = document.createElement('video')
      video.preload = 'metadata'
      if (!video_url) return
      video.src = video_url.toString();
      video.addEventListener('loadedmetadata', () => {
        setWidth(video.videoWidth)
        setHeight(video.videoHeight)
      })
    }
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
  }

  return (
    <div className={containerClass}>
      <button
        title="Add a video"
        onClick={() => {
          fileVideoRef && 
          fileVideoRef?.current?.click()
          setIsImage(false)
          setIsVideo(true)
        }}
      >
        <div className='h-6 w-6'>
          <VideoIcon />
        </div>
        <input
          type="file"
          accept='video/*'
          hidden
          onChange={addVideoToPost}
          ref={fileVideoRef}
        />
      </button>
    </div>
  )
}

export default AddVideo;

