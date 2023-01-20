import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { postRequestHeaders } from '../../main/config'
import { useMessage } from '../../main/TimeMsgContext'
import { Spinner } from '../../utils/Button'
import InteractiveDropdown from './InteractiveDropdown'
import YoutubeDescription from './YoutubeDescription'

type CreateImageProps = {
  news: NewsProps
  setModalType: Dispatch<SetStateAction<modalType>>
  setInput: Dispatch<SetStateAction<InputProps | undefined>>
}

const CreateImage = ({ setModalType, setInput, news: oneNews }: CreateImageProps) => {
  const [value, setValue] = useState<ValueProps>({
    textColor: '#000000',
    fontSize: '80',
  })
  const message = useMessage()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const descriptionArray = oneNews.description.split('\n\n')
  const descriptionArrayToSend: string[] = []

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

  const colorRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <p className="font-bold">{oneNews.title}</p>
      {oneNews.mediaInfo && oneNews?.mediaInfo?.isImage && oneNews.mediaInfo?.image && oneNews.mediaInfo?.width && oneNews.mediaInfo?.height && (
        <div className="mt-2">
          <div className="relative mb-3 max-h-[512px]">
            <picture className="max-h-[512px]">
              <img src={oneNews.mediaInfo.image} width={oneNews.mediaInfo.width} height={oneNews.mediaInfo.height} alt={oneNews.mediaInfo.alt} />
            </picture>
            <div
              style={{
                color: value.textColor,
                fontSize: 40,
              }}
              className={`absolute right-0 left-0 top-0 bottom-0 flex cursor-pointer items-center justify-center break-words`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                createImage()
              }}
            >
              {loading && (
                <div className="absolute">
                  <Spinner />
                </div>
              )}
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShow(true)
                }}
              >
                {oneNews.title}
              </span>
              {show && <InteractiveDropdown colorRef={colorRef} value={value} setValue={setValue} setShow={setShow} />}
            </div>
            <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <input
                hidden
                ref={colorRef}
                type="color"
                value={value.textColor}
                onChange={(e) => {
                  setValue({ ...value, textColor: e.target.value })
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        {descriptionArray?.map((description, key) => (
          <ul key={key}>
            <YoutubeDescription description={description} descriptionArrayToSend={descriptionArrayToSend} />
          </ul>
        ))}
      </div>
    </>
  )
}

export default CreateImage
