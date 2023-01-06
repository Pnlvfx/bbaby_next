import { useNewsProvider } from './NewsContext'
import { buttonClass, Spinner } from '../../utils/Button'
import TeaxtareaAutosize from '../../utils/TeaxtareaAutosize'

const GovSubmitNews = () => {
  const {
    title,
    setTitle,
    mediaInfo,
    description,
    setDescription,
    loading,
    createNews,
  } = useNewsProvider()

  return (
    <div className="w-full max-w-[850px] rounded-md border border-reddit_dark-brightest bg-reddit_dark-brighter lg:ml-4">
      <div>
        <div className="flex whitespace-pre-wrap break-words">
          <div className="flex w-full p-[6px]">
            <TeaxtareaAutosize
              className="row-span-1 block h-auto w-full resize-none rounded-md bg-reddit_dark-brighter pl-3 text-center text-[22px] font-bold leading-6 text-reddit_text placeholder-reddit_text-darker outline-none"
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
              <picture>
                <img
                  alt={mediaInfo.alt}
                  src={mediaInfo.image}
                  height={mediaInfo.height}
                  width={mediaInfo.width}
                />
              </picture>
            )}
        </div>
        <div className="mt-3 flex whitespace-pre-wrap break-words">
          <div className="flex w-full p-[6px]">
            <TeaxtareaAutosize
              className="row-span-1 block h-auto w-full resize-none overflow-hidden whitespace-pre-wrap rounded-md bg-reddit_dark-brighter pl-3 text-[16px] leading-6 text-reddit_text placeholder-reddit_text-darker outline-none md:text-[15px]"
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
            className={`${buttonClass()} flex h-[30px] w-16 items-center justify-center`}
            onClick={() => {
              createNews()
            }}
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
