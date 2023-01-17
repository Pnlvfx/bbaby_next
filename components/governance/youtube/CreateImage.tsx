import { Dispatch, SetStateAction, useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { postRequestHeaders } from '../../main/config'
import { useMessage } from '../../main/TimeMsgContext'
import { Spinner } from '../../utils/Button'
import InteractiveDropdown from './InteractiveDropdown'
import { useYoutubeProvider } from './YoutubeContext'
import YoutubeDescription from './YoutubeDescription'

type CreateImageProps = {
  setModalType: Dispatch<SetStateAction<modalType>>
  setInput: Dispatch<SetStateAction<InputProps | undefined>>
}

const CreateImage = ({ setModalType, setInput }: CreateImageProps) => {
  const [value, setValue] = useState<ValueProps>({
    textColor: '#000000',
    fontSize: '80',
  })
  const message = useMessage()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const { news: oneNews, descriptionArrayToSend } = useYoutubeProvider()
  const descriptionArray = oneNews.description.split('\n\n')

  const createImage = async () => {
    try {
      if (loading) return
      setLoading(true)
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const url = `${server}/governance/create-image`
      const { textColor, fontSize } = value
      const body = JSON.stringify({
        textColor,
        title: oneNews?.title,
        description: descriptionArrayToSend,
        fontSize,
      })
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: postRequestHeaders,
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok) {
        message.setMessage({ value: data?.msg, status: 'success' })
        setInput(data)
        setModalType('create_video')
        setLoading(false)
      } else {
        message.setMessage({ value: data?.msg, status: 'error' })
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <>
      <p className="font-bold">{oneNews.title}</p>
      {oneNews &&
        oneNews.mediaInfo &&
        oneNews?.mediaInfo?.isImage &&
        oneNews.mediaInfo?.image &&
        oneNews.mediaInfo?.width &&
        oneNews.mediaInfo?.height && (
          <div className="mt-2">
            <div className="relative mb-3 max-h-[512px] overflow-hidden">
              <picture className="max-h-[512px] overflow-hidden">
                <img src={oneNews.mediaInfo.image} width={oneNews.mediaInfo.width} height={oneNews.mediaInfo.height} alt={oneNews.mediaInfo.alt} />
              </picture>
              <div
                style={{
                  color: value.textColor,
                  fontSize: `40px`,
                }}
                className={`absolute right-0 left-0 top-0 bottom-0 flex cursor-pointer items-center justify-center break-words`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  createImage()
                }}
              >
                <span
                  className={`cursor-pointer`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShow(true)
                  }}
                >
                  {oneNews.title}
                </span>
                {show && <InteractiveDropdown value={value} setValue={setValue} setShow={setShow} />}
                {loading && (
                  <div className="absolute">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      <div>
        {descriptionArray?.map((description, key) => (
          <ul key={key}>
            <YoutubeDescription description={description} />
          </ul>
        ))}
      </div>
    </>
  )
}

export default CreateImage
