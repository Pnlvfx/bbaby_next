import { useRouter } from 'next/router'
import {  useState, useRef, useContext } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import UserContext from '../../UserContext';
import Image from 'next/image';


function Profile() {
    const provider = useContext(UserContext)
    const {session} = provider

    const [fileInput,setFileInput] = useState('')
    const [previewSource,setPreviewSource] = useState()
    const [selectedFile,setSelectedFile] = useState('')
    

    const filePickerRef = useRef(null);
    const [active,setActive] = useState(false)
    const router = useRouter()
    
    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPreviewSource(reader.result)
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch(server+'/upload_avatar', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}
            })
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div>
            <h1 className='font-semibold py-4 px-5 text-[19px]'>Costumize profile</h1>
            <h2 className=' font-bold p-4 text-[11px] text-reddit_text-darker'>PROFILE INFORMATION</h2>
            <hr className='mx-4 w-1/2 border-reddit_border'/>
        </div>
            <div>
                <h2 className=' font-bold p-4 text-[11px] text-reddit_text-darker'>IMAGES</h2>
                <hr className='mx-4 w-1/2 border-reddit_border'/>
                <h1 className='font-bold p-4 pt-6 pb-0'>Avatar and banner image</h1>
                <h2 className='p-4 pt-0 text-sm text-reddit_text-darker'>Images must be .png or .jpg format</h2>
            </div>
            <div className='p-6'>
            <div onClick={() => filePickerRef.current.click()} className='rounded-full bg-reddit_dark-brightest h-36 w-36 flex cursor-pointer relative overflow-hidden'>
                    <Image src={session.user.avatar} layout='fill' alt='user_image' />
                <AiOutlinePlus className='absolute mx-[95px] mt-[100px] text-reddit_text-darker w-8 h-8'/>
            </div>
            <form onSubmit={handleSubmitFile}>
                <input hidden type="file" name="image" id="file_up" ref={filePickerRef} onChange={handleFileInputChange} value={fileInput} />
                <button type='submit'>submit</button>
            </form>
            {previewSource && (
                <Image src={previewSource} width={'384px'} height={'384px'} />
            )}
            </div>
    </>
  )
}

export default Profile;