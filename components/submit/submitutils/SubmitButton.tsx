import {GrBold,GrEmoji} from 'react-icons/gr'
import {GoItalic} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import { Dispatch, SetStateAction, useRef,useState } from 'react';
import { AddImageIcon } from '../../utils/SVG';

interface SubmitButton {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    setSelectedFile: Dispatch<SetStateAction<any>>
    setIsImage: Dispatch<SetStateAction<boolean>>
    setImageHeight: Dispatch<SetStateAction<number>>
    setImageWidth: Dispatch<SetStateAction<number>>
}

function SubmitButton({title,setTitle,setSelectedFile,setIsImage,setImageHeight,setImageWidth}:SubmitButton) {
    const Imageclass = 'p-2 text-reddit_text-darker'
    const iconClass = 'w-[22px] h-[22px]'

    const [showEmojis,setShowEmojis] = useState(false)
    const filePickerRef:any = useRef(null)
    
    //add image
    const addImageToPost = (e: any) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file: Blob) => {
        if(!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            let image_url = event?.target?.result
            let image:any = document.createElement("img")
            image.src = image_url

            image.onload = (e:any) => {
                setImageHeight(e.target.height)
                setImageWidth(e.target.width)
            }
        }
        reader.onloadend = () => {
            setSelectedFile(reader.result)
        }
    }

    //emoji
    const addEmoji = (e: any) => {
        let sym = e.unified.split("-")
        let codesArray:any[] = [];
        sym.forEach((el:string) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray)
        setTitle(title + emoji);
    }

  return (
    <div>
        <div className='flex ml-1'>
            <div className={Imageclass}>
                <button title='Bold'>
                    <GrBold className={iconClass} />
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Italic'>
                    <GoItalic className={iconClass}/>
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Link' onClick={() => {
                   
                    }} >
                    <BiLink className={iconClass}/>
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Add an image' onClick={() => {
                    filePickerRef.current.click()
                    setIsImage(true)
                }}>
                    <AddImageIcon />
                    <input type='file' hidden onChange={addImageToPost} ref={filePickerRef} />
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Add emojis' onClick={() => {
                    setShowEmojis(!showEmojis)
                }}>
                    <GrEmoji className={iconClass} />
                </button>            
            </div>
            <div className={Imageclass + ' w-[80px] flex pt-0 ml-auto p-1'}>
                <button>
                    <h1 className='text-xs text-reddit_text font-bold'>Markdown Mode</h1>
                </button>     
            </div>
        </div>
    </div>
  )
}

export default SubmitButton