import { useContext, useRef } from 'react';
import { VideoIcon } from '../../utils/SVG';
import { SubmitContext, SubmitContextType } from '../SubmitContext';

const AddVideo = () => {
  const containerClass = 'p-2 text-reddit_text-darker'
  const { setSelectedFile, setIsVideo, setWidth, setHeight, setIsImage } =
    useContext(SubmitContext) as SubmitContextType
  const fileVideoRef = useRef<HTMLInputElement>(null)
  const addVideoToPost = (e: any) => {
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
      video.addEventListener('loadedmetadata', function () {
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
          hidden
          onChange={addVideoToPost}
          ref={fileVideoRef}
        />
      </button>
    </div>
  )
}

export default AddVideo
