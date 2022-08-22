import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { postRequestHeaders } from '../../main/config';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { buttonClass, Spinner } from '../../utils/Button';
import { inputClass } from '../../utils/Input';
import { YoutubeContext, YoutubeContextProps } from './YoutubeContext';
import YoutubeNewsCard from './YoutubeNewsCard';

type CreateImageProps = {
  setModalType: Dispatch<SetStateAction<modalType>>
  setInput: Dispatch<SetStateAction<InputProps>>
}

const CreateImage = ({
  setModalType,
  setInput
}: CreateImageProps) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const _value:ValueProps = {
    textColor: '#59ff00',
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
      const url = `${server}/governance/create-image`
      const body = JSON.stringify({
        textColor: value.textColor,
        newsId: news?._id,
        description: descriptionArrayToSend,
        fontSize: value.fontSize,
        format: value.format,
      })
      const res = await fetch(url, {
        method: 'post',
        body,
        headers: postRequestHeaders,
        credentials: 'include'
      })
      if (res.ok) {
        const images = await res.json();
        setMessage({value: images.msg, status: 'success'})
        setInput(images)
        setModalType('create_video')
        setLoading(false)
      } else {
        const error = await res.json();
        setMessage({value:error.msg, status: 'error' })
        setLoading(false)
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage({value: err.message, status: 'error'})
        setLoading(false);
      } else {
        setMessage({value: "Something went wrong!", status: 'error'})
        setLoading(false);
      }
    }
  }

  return (
    <div className='flex mt-5'>
      <YoutubeNewsCard {...value} />
      <form className="w-full p-2 bg-reddit_dark-brighter space-y-4 rounded-md border border-reddit_border">
        <div id="news_id" className="flex items-center">
            <p>News id:</p>
            <p className={`ml-auto font-bold text-reddit_red`}>{news._id}</p>
        </div>
        <div id="text_color" className="flex items-center">
          <p className="">Text Color:</p>
          <input
            type="color"
            title="text_color"
            value={value.textColor}
            className={`${inputClass} font-bold ml-auto`}
            onChange={(e) =>
              setValue({ ...value, textColor: e.target.value })
            }
          />
        </div>
        <div id="font_size" className="flex items-center">
            <p className="">Font Size:</p>
              <input
                type="number"
                title="font_size"
                value={value.fontSize}
                onChange={(e) =>
                  setValue({ ...value, fontSize: e.target.value })
                }
                className={`${inputClass} font-bold text-right ml-auto`}
              />
        </div>
        <div id="format" className="flex items-center">
            <p className="">Format:</p>
            <input
              type="text"
              title="font_size"
              value={value.format}
              onChange={(e) =>
                setValue({ ...value, format: e.target.value })
              }
              className={`${inputClass} font-bold text-right ml-auto`}
            />
        </div>
        <div id='button_submit' className="flex items-center justify-center">
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
      </form>
    </div>
  )
}

export default CreateImage;

