import axios from 'axios';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { buttonClass, Spinner } from '../../utils/Button';
import { inputClass } from '../../utils/Input';
import { YoutubeContext, YoutubeContextProps } from './YoutubeContext';
import YoutubeLogin from './YoutubeLogin';
import YoutubeNewsCard from './YoutubeNewsCard';

type CreateImageProps = {
  modalType: string
  setModalType: Dispatch<SetStateAction<modalType>>
  setInput: Dispatch<SetStateAction<InputProps>>
  input: InputProps
}

const CreateImage = ({
  modalType,
  setModalType,
  setInput,
  input,
}: CreateImageProps) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const _value = {
    textColor: 'rgb(26, 26, 27)',
    community: 'Italy',
    fontSize: '48',
    format: 'webp',
  }
  const [value, setValue] = useState(_value)
  const [loading, setLoading] = useState(false)
  const {news,descriptionArrayToSend} = useContext(YoutubeContext) as YoutubeContextProps;

  const createImage = async () => {
    try {
      setLoading(true)
      const data = {
        textColor: value.textColor,
        newsId: news?._id,
        description: descriptionArrayToSend,
        fontSize: value.fontSize,
        format: value.format,
      }
      const res = await axios.post(`${server}/governance/create-image`, data, {
        withCredentials: true,
      })
      setMessage({value: res.data.msg, status: 'success'})
      setInput(res.data)
      setModalType('create_video')
      setLoading(false)
    } catch (err: any) {
      err.response.data.msg &&
        setMessage({value: err.response.data.msg, status: 'error' })
        setLoading(false)
    }
  }

  console.log(input)


  return (
    <>
      {modalType === 'create_image' && (
        <div className='flex mt-5'>
        <YoutubeNewsCard />
          <form className="w-full mx-2 p-2">
            <div id="news_id" className="flex">
                <p>News id:</p>
                <p className='ml-auto font-bold'>{news?._id}</p>
            </div>
            <div id="set_text_color" className="mt-2 flex">
                <p className="">Text Color:</p>
              <div className="ml-auto">
                <input
                  type="color"
                  title="text_color"
                  value={value.textColor}
                  onChange={(e) =>
                    setValue({ ...value, textColor: e.target.value })
                  }
                  className={`${inputClass} p-2 font-bold`}
                />
              </div>
            </div>
            <div id="set_font_size" className="mt-2 flex">
                <p className="">Font Size:</p>
              <div className="ml-auto self-center">
                <input
                  type="text"
                  title="font_size"
                  value={value.fontSize}
                  onChange={(e) =>
                    setValue({ ...value, fontSize: e.target.value })
                  }
                  className={`${inputClass} p-2 font-bold`}
                />
              </div>
            </div>
            <div id="format" className="mt-2 flex">
                <p className="">Format:</p>
              <div className="ml-auto self-center">
                <input
                  type="text"
                  title="font_size"
                  value={value.format}
                  onChange={(e) =>
                    setValue({ ...value, format: e.target.value })
                  }
                  className={`${inputClass} p-2 font-bold`}
                />
              </div>
            </div>
            <div id="create_image" className="mt-4">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className={`h-7 w-40 ${buttonClass()}`}
                  onClick={() => {
                    createImage()
                  }}
                >
                  {loading && <Spinner />}
                  {!loading && <p>Create Image</p>}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CreateImage;

