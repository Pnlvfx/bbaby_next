import axios from 'axios'
import { SetStateAction, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Button from '../../utils/Button'

type UploadVideoProps = {
    input: InputProps
    setInput: SetStateAction<any>
    setModalType: SetStateAction<any>
}

const UploadVideo = ({input,setInput,setModalType}:UploadVideoProps) => {
    const [loading,setLoading] = useState(false)
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const uploadVideo = async() => {
        try {
            setLoading(true)
            const data = {
                title:input.title,
                description:input.description,
                tags:input.keywords,
                categoryId:input.category,
                privacyStatus: input.privacyStatus,
            }
            const res = await axios.post(`${server}/governance/youtube`,data, {withCredentials:true})
            setInput({...input, success: res.data.success})
            setModalType('create_image')
            setLoading(false)
        } catch (err:any) {
          setInput({...input, err: err.message})
          setLoading(false)
        }
    }

  return (
    <>
    {input.video && (
        <>
            <div id="upload_video" className="mt-2 flex p-2">
                <div className="self-center">
                    <h1 className="">Submit:</h1>
                </div>
                <div className="ml-auto self-center">
                    <>
                        <Button type='submit' onClick={() => {
                            uploadVideo()
                        }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                            {loading && <AiOutlineLoading3Quarters className='animate-spin mx-auto'/>}
                            {!loading && <p>Upload video</p>}
                        </Button>
                    </>
                </div>
            </div> 
        </>
    )}
    </>
  )
}

export default UploadVideo;