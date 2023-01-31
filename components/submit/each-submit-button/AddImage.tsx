import { ChangeEvent, useRef } from 'react'
import { useMessage } from '../../main/TimeMsgContext'
import { AddImageIcon } from '../../utils/SVG/SVG'
import { useSubmitProvider } from '../SubmitContext'
import { previewImage } from '../submitutils/myReader'

const AddImage = () => {
  const message = useMessage()
  const filePickerRef = useRef<HTMLInputElement>(null)
  const { setSelectedFile, setIsImage, setHeight, setWidth, setIsVideo } = useSubmitProvider()

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      previewImage(file, message, setHeight, setWidth, setSelectedFile)
    }
  }

  return (
    <span className="h-8 w-8">
      <button
        className={`submitButton`}
        role={'button'}
        tabIndex={-1}
        title="Add an image"
        onClick={() => {
          filePickerRef && filePickerRef.current?.click()
          setIsVideo(false)
          setIsImage(true)
        }}
      >
        <AddImageIcon className={'submitButtonIcon'} />
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <div className={'submitButtonTitle transition-opacity'}>{'Add an image'}</div>
        </div>
        <input className="text-[16px]" type="file" accept="image/png, image/jpeg, image/webp" hidden onChange={addImageToPost} ref={filePickerRef} />
      </button>
    </span>
  )
}

export default AddImage
