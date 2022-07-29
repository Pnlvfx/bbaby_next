import axios from 'axios'
import { SetStateAction, useContext, useState } from 'react'
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext'
import { buttonClass, Spinner } from '../../utils/Button'

type UploadVideoProps = {
    input: InputProps
    setInput: SetStateAction<any>
    setModalType: SetStateAction<any>
}

const UploadVideo = ({input,setInput,setModalType}:UploadVideoProps) => {
    const [loading,setLoading] = useState(false)
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
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
            setMessage({value: res.data.msg, status: 'success'})
            setModalType('create_image')
            setLoading(false)
        } catch (err:any) {
          setMessage({value: err.message, status: 'error'})
          setLoading(false)
        }
    }

  return (
    <>
    {input.video && (
        <>
            <div id="upload_video" className="mt-2 flex p-2">
                <div className="ml-auto">
                    <>
                        <button type='submit' onClick={() => {
                            uploadVideo()
                        }} className={`w-40 h-7 mb-3 ml-auto mr-5 ${buttonClass()}`}>
                            {loading && <Spinner />}
                            {!loading && <p>Upload video</p>}
                        </button>
                    </>
                </div>
            </div> 
        </>
    )}
    </>
  )
}

export default UploadVideo;