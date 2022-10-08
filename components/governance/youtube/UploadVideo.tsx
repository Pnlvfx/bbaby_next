import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { catchErrorWithMessage } from '../../API/common';
import { postRequestHeaders } from '../../main/config';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { buttonClass, Spinner } from '../../utils/Button';

type UploadVideoProps = {
    input: InputProps
    setModalType: Dispatch<SetStateAction<'create_image' | 'create_video'>>
    setInput: Dispatch<SetStateAction<InputProps>>
}

const UploadVideo = ({input, setModalType, setInput }: UploadVideoProps) => {
    const [loading,setLoading] = useState(false)
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const message = useContext(TimeMsgContext) as TimeMsgContextProps;
    
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
                message.setMessage({value: response.msg, status: 'success'})
                setModalType('create_image')
                setLoading(false)
                } else {
                    message.setMessage({value: response.msg, status: 'error'})
                    setLoading(false)
                }
        } catch (err) {
            setLoading(false);
            catchErrorWithMessage(err, message);    
        }
    }

  return (
    <form className="w-full text-sm">
        <video
            className={`aspect-video`}
            src={input.video}
            id="video_pre-share"
            poster={input.images[0]}
            controls={true}
            width={input.width}
            height={input.height}
        />
        <div id='flex w-full ml-3' >
        <div id="set_title" className="mt-2 flex items-center">
            <p>Title:</p>
            <div className='w-full text-center'>
            <textarea
                title="title"
                value={input.title}
                onChange={(e) => {
                setInput({ ...input, title: e.target.value })
                }}
                className="w-full text-center bg-reddit_dark-brighter font-bold text-[16px]"
            />
            </div>
        </div>
        <div id="set_description" className="mt-2 flex">
            <p>Description:</p>
            <div className="w-full">
            <textarea
                title="description"
                value={input.description}
                onChange={(e) => {
                setInput({ ...input, description: e.target.value })
                }}
                className="whitespace-pre-wrap max-h-[335px] min-h-[135px] ml-3 w-full bg-reddit_dark-brighter font-bold text-[16px]"
            />
            </div>
        </div>
        <div id="keywords" className="mt-2 flex">
            <p>Keywords:</p>
            <input
            type="text"
            title="keywords"
            value={input.keywords}
            onChange={(e) =>
                setInput({ ...input, keywords: e.target.value })
            }
            className={`ml-auto font-bold inputClass`}
            />
        </div>
        <div id="category" className="mt-2 flex">
            <p className="">Category:</p>
            <input
            type="text"
            title="keywords"
            value={input.category}
            onChange={(e) =>
                setInput({ ...input, category: e.target.value })
            }
            className={`ml-auto font-bold inputClass`}
            />
        </div>
        <div id="privacyStatus" className="mt-2 flex">
            <p>PrivacyStatus:</p>
            <input
            type="text"
            title="privacyStatus"
            value={input.privacyStatus}
            onChange={(e) =>
                setInput({ ...input, privacyStatus: e.target.value })
            }
            className={`ml-auto font-bold inputClass`}
            />
        </div>
        </div>
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
    </form>
  )
}

export default UploadVideo;
