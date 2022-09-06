import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { postRequestHeaders } from '../../main/config';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { buttonClass, Spinner } from '../../utils/Button';

type UploadVideoProps = {
    input: InputProps
    setModalType: Dispatch<SetStateAction<'create_image' | 'create_video'>>
}

const UploadVideo = ({input,setModalType}:UploadVideoProps) => {
    const [loading,setLoading] = useState(false)
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
    const uploadVideo = async() => {
        try {
            setLoading(true)
            const body = JSON.stringify({
                title: input.title,
                description: input.description,
                tags: input.keywords,
                categoryId: input.category,
                privacyStatus: input.privacyStatus,
            })
            const url = `${server}/governance/youtube`;
            const res = await fetch(url, {
                method: 'post',
                headers: postRequestHeaders,
                body,
                credentials: 'include'
            })
            const response = await res.json();
            if (res.ok) {
                setMessage({value: response.msg, status: 'success'})
                setModalType('create_image')
                setLoading(false)
                } else {
                    setMessage({value: response.msg, status: 'error'})
                    setLoading(false)
                }
        } catch (err) {
            if (err instanceof Error) {
                setMessage({value: err.message, status: 'error'})
                setLoading(false)
            } else {
                setMessage({value: "That's strange!", status: 'error'})
                setLoading(false)
            }
            }
    }

  return (
    <>
    {input.video && (
        <>
            <div id="upload_video" className="mt-2 flex p-2">
                <div className="ml-auto">
                    <button
                        disabled={loading}
                        className={`w-40 h-7 mb-3 ml-auto mr-5 ${buttonClass()}${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        type='submit'
                        onClick={() => {
                            uploadVideo()
                        }}>
                        {loading && <Spinner />}
                        {!loading && <p>Upload video</p>}
                    </button>
                </div>
            </div> 
        </>
    )}
    </>
  )
}

export default UploadVideo;