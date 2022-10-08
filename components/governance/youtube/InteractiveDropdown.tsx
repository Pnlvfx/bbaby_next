import { Dispatch, SetStateAction, useRef } from "react";
import ClickOutHandler from 'react-clickout-ts';

interface InteractiveDropdown {
    value: ValueProps
    setValue: Dispatch<SetStateAction<ValueProps>>
    setShow: Dispatch<SetStateAction<boolean>>
}

const InteractiveDropdown = ({ value, setValue, setShow }: InteractiveDropdown) => {
    const colorRef = useRef<HTMLInputElement>(null);

  return (
    <div className='text-center flex items-center justify-center w-full h-full absolute cursor-default'>
        <ClickOutHandler onClickOut={() => {
            setShow(false);
        }}>
            <div 
                className="z-[100] cursor-default relative bg-reddit_dark-brighter flex items-center justify-center w-[200px] h-[200px]"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // prevent submitting when modal is open
                }}
            >
                <div className="w-full h-full">
                    <div>
                        <input
                            hidden
                            ref={colorRef}
                            type="color"
                            value={value.textColor}
                            onChange={(e) => {
                                setValue({ ...value, textColor: e.target.value })
                            }}
                        />
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            colorRef.current?.click();
                        }} className="text-sm text-reddit_text ">
                            Choose color
                        </button>
                    </div>
                    <div id="font_size" className="flex items-center pt-auto text-reddit_text z-100 h-full justify-center">
                        <p className="text-sm inline-block">Font Size:</p>
                        <input
                            type="number"
                            title="font_size"
                            value={value.fontSize}
                            onChange={(e) => {
                                setValue({ ...value, fontSize: e.target.value })
                            }}
                            className={`inputClass font-bold w-10`}
                        />
                    </div>
                </div>
            </div>
        </ClickOutHandler>
    </div>
  )
}

export default InteractiveDropdown;
