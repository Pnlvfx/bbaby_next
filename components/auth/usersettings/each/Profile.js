import { useState, useRef, useContext, useEffect } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import UserContext from '../../UserContext';
import Image from 'next/image';
import axios from 'axios';
import ShowTimeMsg from '../../../utils/notification/ShowTimeMsg';


function Profile() {
    const provider = useContext(UserContext)
    const {session} = provider

    const [selectedFile,setSelectedFile] = useState(session.user.avatar)
    const [change,setChange] = useState(false)
    

    const filePickerRef = useRef(null);
    const [value,setValue] = useState('')

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setSelectedFile(reader.result)
            setChange(true)
        }
    }
    
    useEffect(() => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        try {
            if (!change) return
            const data = {image: selectedFile, username: session.user.username}
            axios({
                method: "POST",
                url: server+'/user/change_avatar',
                data: data,
                headers: {'Content-type': 'application/json'},
            }).then(res => {
                setChange(false)
                setValue(res.data.success)
            })
        } catch (err) {
            setValue(res.data.msg)
        }
    },[change])

  return (
    <>
        <div>
            <h1 className='font-semibold py-4 px-5 text-[19px]'>Costumize profile</h1>
            <h2 className=' font-bold px-4 pt-4 pb-1 text-[11px] text-reddit_text-darker'>PROFILE INFORMATION</h2>
            <hr className='mx-4 w-1/2 border-reddit_border'/>
        </div>
            <div>
                <h2 className='font-bold px-4 pt-4 pb-1 text-[11px] text-reddit_text-darker'>IMAGES</h2>
                <hr className='mx-4 w-1/2 border-reddit_border'/>
                <h1 className='font-bold text-sm p-4 pt-6 pb-0'>Avatar and banner image</h1>
                <h2 className='p-4 pt-0 text-sm text-reddit_text-darker'>Images must be .png or .jpg format</h2>
            </div>
            <div className='p-6'>
                <div onClick={() => filePickerRef.current.click()} className='rounded-full bg-reddit_dark-brightest h-36 w-36 flex cursor-pointer relative overflow-hidden'>
                    <Image src={selectedFile} layout='fill' alt='user_image' />
                    <AiOutlinePlus className='absolute mx-[95px] mt-[100px] text-reddit_text-darker w-8 h-8'/>
                </div>
                    <input hidden type="file" name="image" id="file_up" ref={filePickerRef} onChange={handleFileInputChange}/>
            </div>
            <ShowTimeMsg value={value} setValue={setValue} />
    </>
  )
}

export default Profile;