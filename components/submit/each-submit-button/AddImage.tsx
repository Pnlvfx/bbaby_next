import { useContext, useRef } from 'react'
import { AddImageIcon } from '../../utils/SVG'
import { SubmitContext, SubmitContextType } from '../SubmitContext'

const AddImage = () => {
  const containerClass = 'p-2 text-reddit_text-darker'
  const filePickerRef: any = useRef(null)
  const { setSelectedFile, setIsImage, setHeight, setWidth, setIsVideo } =
    useContext(SubmitContext) as SubmitContextType

  const addImageToPost = (e: any) => {
    const file = e.target.files[0]
    previewImage(file)
  }

  const previewImage = (file: Blob) => {
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      let image_url = event?.target?.result
      let image: any = document.createElement('img')
      image.src = image_url

      image.onload = (e: any) => {
        setHeight(e.target.height)
        setWidth(e.target.width)
      }
    }
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
  }

  return (
    <div className={containerClass}>
      <button
        title="Add an image"
        onClick={() => {
          filePickerRef.current.click()
          setIsVideo(false)
          setIsImage(true)
        }}
      >
        <AddImageIcon />
        <input
          type="file"
          hidden
          onChange={addImageToPost}
          ref={filePickerRef}
        />
      </button>
    </div>
  )
}

export default AddImage
