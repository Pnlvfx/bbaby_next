import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { catchErrorWithMessage } from '../../API/common';
import { useSession } from '../../auth/UserContext';
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

const CreateImage = ({ setModalType, setInput }: CreateImageProps) => {
  const _value = {
    textColor: '#000000',
    fontSize: '80',
    format: 'png',
  }
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const [value, setValue] = useState<ValueProps>(_value);
  const [loading, setLoading] = useState(false);
  const {news, descriptionArrayToSend} = useContext(YoutubeContext) as YoutubeContextProps;
  const {session} = useSession();

  const createImage = async () => {
    try {
      setLoading(true)
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const url = `${server}/governance/create-image`;
      const body = JSON.stringify({
        textColor: value.textColor,
        title: news?.title,
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
        message.setMessage({value: images.msg, status: 'success'})
        setInput(images)
        setModalType('create_video')
        setLoading(false)
      } else {
        const error = await res.json();
        message.setMessage({value:error.msg, status: 'error' })
        setLoading(false)
      }
    } catch (err) {
      setLoading(false);
      catchErrorWithMessage(err, message);
    }
  }

  return (
    <div className='flex mt-4'>
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

