import { Dispatch, RefObject, SetStateAction } from 'react'
import ClickOutHandler from 'react-clickout-ts'

interface InteractiveDropdown {
  value: ValueProps
  setValue: Dispatch<SetStateAction<ValueProps>>
  setShow: Dispatch<SetStateAction<boolean>>
  colorRef: RefObject<HTMLInputElement>
}

const InteractiveDropdown = ({ colorRef, value, setValue, setShow }: InteractiveDropdown) => {
  return (
    <div className="absolute flex h-full w-full cursor-default items-center justify-center text-center">
      <ClickOutHandler
        onClickOut={() => {
          setShow(false)
        }}
      >
        <div
          className="relative z-[100] flex h-[200px] w-[200px] cursor-default items-center justify-center bg-reddit_dark-brighter"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // prevent submitting when modal is open
          }}
        >
          <div className="h-full w-full">
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  colorRef.current?.click()
                }}
                className="text-sm text-reddit_text"
              >
                Choose color
              </button>
            </div>
            <div id="font_size" className="pt-auto z-100 flex h-full items-center justify-center text-reddit_text">
              <p className="inline-block text-sm">Font Size:</p>
              <input
                type="number"
                title="font_size"
                value={value.fontSize}
                onChange={(e) => {
                  setValue({ ...value, fontSize: e.target.value })
                }}
                className={`inputClass w-10 font-bold`}
              />
            </div>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  )
}

export default InteractiveDropdown
