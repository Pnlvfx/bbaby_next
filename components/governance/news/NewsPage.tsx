import Router from 'next/router'
import { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { catchErrorWithMessage } from '../../API/common'
import { useMessage } from '../../main/TimeMsgContext'
import { Spinner } from '../../utils/buttons/Button'
import CheckBox from '../../utils/buttons/CheckBox'
import GovSubmitNews from './submit/GovSubmitNews'
import { useNewsProvider } from './NewsContext'
import PexelsImages from './PexelsImages'
import govapis from '../../API/governance/govapis'
import bbabyapis from '../../API/bbabyapis'

const NewsPage = () => {
  const { level, setlevel, originalTitle, originalImage, originalDescription, setTitle, setDescription, setMediaInfo } = useNewsProvider()
  const [useRandomImage, setUseRandomImage] = useState(true)
  const message = useMessage()
  const [loading, setLoading] = useState(false)

  const open = async () => {
    try {
      if (useRandomImage) {
        setLoading(true)
        const data = await bbabyapis.generateImage(originalTitle)
        setMediaInfo({
          image: data.image,
          alt: originalTitle.substring(0, 50),
          height: data.height,
          width: data.width,
          isImage: true,
        })
        openSubmit()
      } else {
        setlevel('image')
      }
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  const openSubmit = async () => {
    try {
      const title = await govapis.translate(originalTitle, 'en')
      const description = await govapis.translate(originalDescription, 'en')
      setTitle(title)
      setDescription(description)
      setlevel('submit')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <div className={`mt-4 ${level === 'read' ? 'mx-auto max-w-[1000px]' : 'lg:grid lg:grid-cols-2'}`}>
      <div className={`${level === 'image' || level === 'submit' ? 'hidden' : ''} lg:block lg:px-2`}>
        <article className="rounded-md border border-reddit_border bg-reddit_dark-brighter hover:border-reddit_text">
          <div className="mt-2 mb-4 flex items-center justify-center text-2xl font-bold" id="title">
            <button
              className="mr-auto hidden pl-3 lg:block"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                Router.push('/governance/news')
              }}
            >
              <MdArrowBackIosNew className="text-reddit_blue" />
            </button>
            <p className="text-center lg:mr-auto">{originalTitle}</p>
          </div>
          <div
            title="Open pexels search"
            className="relative flex cursor-pointer justify-center"
            onClick={(e) => {
              e.preventDefault()
              if (loading) return
              open()
            }}
          >
            <picture>
              <img src={originalImage} alt="News Image" />
            </picture>
            {loading && (
              <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                <Spinner width={50} height={50} color={'black'} />
              </div>
            )}
          </div>
          <div className="mt-5 ml-1 flex items-center justify-center">
            <CheckBox title="Use random image" check={useRandomImage} setCheck={setUseRandomImage} />
          </div>
          <p className="mt-2 flex items-center justify-center whitespace-pre-wrap leading-5">{originalDescription}</p>
        </article>
      </div>
      {level === 'image' && <PexelsImages openSubmit={openSubmit} />}
      {level === 'submit' && <GovSubmitNews />}
    </div>
  )
}

export default NewsPage
