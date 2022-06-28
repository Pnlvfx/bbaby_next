import axios from 'axios'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Button from '../../utils/Button'


const UploadVideo = ({input,setInput}:any) => {
    const [loading,setLoading] = useState(false)
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME

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
            const res = await axios.post(`${hostname}/api/governance/youtube`,data)
            console.log(res.data.VideoInfo)
            setInput({...input, success: res.data.success})
            setLoading(false)
        } catch (err:any) {
          setInput(err.message) 
        }
    }

  return (
    <>
        <div id="upload_video" className="mt-2 flex p-2">
            <div className="self-center">
                {input.video && <h1 className="">Submit:</h1>}
            </div>
            <div className="ml-auto self-center">
                {input.video && (
                <>
                <Button type='submit' onClick={() => {
                    uploadVideo()
                }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                    {loading && <AiOutlineLoading3Quarters className='animate-spin mx-auto'/>}
                    {!loading && <h1>Upload video</h1>}
                </Button>
                </>
                )}
            </div>
        </div>
    </>
  )
}

export default UploadVideo;