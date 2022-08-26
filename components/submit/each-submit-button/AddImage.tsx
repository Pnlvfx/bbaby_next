import { ChangeEvent, useContext, useRef } from 'react'
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext'
import { AddImageIcon } from '../../utils/SVG'
import { SubmitContext, SubmitContextType } from '../SubmitContext'

const AddImage = () => {
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const containerClass = 'p-2 text-reddit_text-darker'
  const filePickerRef = useRef<HTMLInputElement>(null)
  const { setSelectedFile, setIsImage, setHeight, setWidth, setIsVideo } = useContext(SubmitContext) as SubmitContextType

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      previewImage(file)
    }
  }

  const previewImage = (file: Blob) => {
    try {
      if (!file) return
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        let image_url = event.target?.result;
        let image = document.createElement('img')
        if (!image_url) return setMessage({value:'no valid image.', status: 'error'})
        if (image_url.toString().match('video')) return setMessage({value:'Only images are accepted here. Please use the "Add video" button if you want to share a video.', status: 'error'})
        image.src = image_url.toString()
        image.onload = (e:any) => {
          setHeight(e.target?.height)
          setWidth(e.target?.width)
        }
        reader.onloadend = () => {
          setSelectedFile(reader.result)
        }
        reader.onerror = (ev) => {
          setMessage({value: 'Something went wrong, please try to use a different image.', status: 'error'})
        }
        } 
    } catch (err) {
      setMessage({value: 'Something went wrong, please try to use a different image.', status: 'error'})
    }
  }

  return (
    <div className={containerClass}>
      <button
        title="Add an image"
        onClick={() => {
          filePickerRef &&
          filePickerRef.current?.click()
          setIsVideo(false)
          setIsImage(true)
        }}
      >
        <AddImageIcon />
        <input
          type="file"
          accept='image/png, image/jpeg, image/webp'
          hidden
          onChange={addImageToPost}
          ref={filePickerRef}
        />
      </button>
    </div>
  )
}

export default AddImage
