import TextareaAutosize from 'react-textarea-autosize'
import { useContext } from 'react'
import { NewsContext, NewsContextProps } from './NewsContext'
import Image from 'next/image'
import { buttonClass, Spinner } from '../../utils/Button'

const GovSubmitNews = () => {
  const {
    title,
    setTitle,
    mediaInfo,
    description,
    setDescription,
    loading,
    createNews,
  } = useContext(NewsContext) as NewsContextProps;

  return (
    <div className="mx-4 w-full max-w-[1000px] rounded-md bg-reddit_dark-brighter border border-reddit_dark-brightest">
      <div>
        <div className="mt-3 flex whitespace-pre-wrap break-words">
          <div className="flex w-full p-[6px]">
            <TextareaAutosize
              className="row-span-1 block h-auto w-full resize-none rounded-md bg-reddit_dark-brighter pl-3 text-[22px] font-bold leading-6 text-reddit_text placeholder-reddit_text-darker outline-none"
              placeholder={'Title'}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="mt-2 mb-3 box-content flex justify-center rounded-md  border border-reddit_border p-3">
          {mediaInfo.isImage &&
            mediaInfo.image &&
            mediaInfo.width &&
            mediaInfo.height && (
              <Image
                alt={mediaInfo.alt}
                src={mediaInfo.image}
                height={mediaInfo.height / 2}
                width={mediaInfo.width / 2}
              />
            )}
        </div>
        <div className="mt-3 flex whitespace-pre-wrap break-words">
          <div className="flex w-full p-[6px]">
            <TextareaAutosize
              className="row-span-1 block h-auto w-full resize-none overflow-hidden rounded-md bg-reddit_dark-brighter pl-3 text-[15px] leading-6 text-reddit_text placeholder-reddit_text-darker outline-none"
              placeholder={'Description'}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex justify-end p-2">
          <button
            onClick={() => {
              createNews()
            }}
            className={`${buttonClass()} h-[30px] w-16 flex items-center justify-center`}
          >
            {loading && <Spinner />}
            {!loading && <p className="text-right">Post</p>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GovSubmitNews
