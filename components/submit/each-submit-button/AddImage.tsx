import { ChangeEvent, useContext, useRef } from 'react'
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext'
import { AddImageIcon } from '../../utils/SVG'
import { SubmitContext, SubmitContextType } from '../SubmitContext'
import { previewImage } from '../submitutils/myReader'
import { buttonClass, hoverClass, iconClass } from './SubmitButton'

const AddImage = () => {
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const filePickerRef = useRef<HTMLInputElement>(null)
  const { setSelectedFile, setIsImage, setHeight, setWidth, setIsVideo } = useContext(SubmitContext) as SubmitContextType

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      previewImage(file, message, setHeight, setWidth, setSelectedFile);
    }
  }

  return (
    <span className='h-8 w-8'>
      <button 
        className={buttonClass}
        role={'button'}
        tabIndex={-1}
        style={{lineHeight: 0}}
        title="Add an image"
        onClick={() => {
          filePickerRef &&
          filePickerRef.current?.click()
          setIsVideo(false)
          setIsImage(true)
        }}
      >
        <AddImageIcon className={iconClass} />
        <div className='bottom-0 left-0 absolute right-0 top-0'>
            <div className={hoverClass}>
                  {'Add an image'}
              </div>
          </div>
        <input
          className='text-[16px]'
          type="file"
          accept='image/png, image/jpeg, image/webp'
          hidden
          onChange={addImageToPost}
          ref={filePickerRef}
        />
      </button>
    </span>
  )
}

export default AddImage
