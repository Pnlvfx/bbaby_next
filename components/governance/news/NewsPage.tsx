import Router from 'next/router'
import { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { catchErrorWithMessage } from '../../API/common'
import { translate } from '../../API/governance/governanceAPI'
import { useMessage } from '../../main/TimeMsgContext'
import CheckBox from '../../utils/buttons/CheckBox'
import GovSubmitNews from './GovSubmitNews'
import { useNewsProvider } from './NewsContext'
import PexelsImages from './PexelsImages'

const NewsPage = () => {
  const { level, setlevel, originalTitle, originalImage, originalDescription, setTitle, setDescription, setMediaInfo } = useNewsProvider()
  const [useCurrentImage, setUseCurrentImage] = useState(false)
  const message = useMessage()

  const openPexelsImageForm = () => {
    if (useCurrentImage) {
      const image = new Image()
      image.src = originalImage

      image.onload = () => {
        setMediaInfo({
          image: originalImage,
          alt: image.alt,
          height: image.naturalHeight,
          width: image.naturalWidth,
          isImage: true,
        })
      }
      openSubmit()
    } else {
      setlevel('image')
    }
  }

  const openSubmit = async () => {
    try {
      const title = await translate(originalTitle, 'en')
      const description = await translate(originalDescription, 'en')
      setTitle(title)
      setDescription(description)
      setlevel('submit')
    } catch (err) {
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
            <p className="mr-auto text-center">{originalTitle}</p>
          </div>
          <div
            title="Open pexels search"
            className="flex cursor-pointer justify-center"
            onClick={(e) => {
              e.preventDefault()
              openPexelsImageForm()
            }}
          >
            <picture>
              <img src={originalImage} alt="News Image" />
            </picture>
          </div>
          <div className="mt-2 ml-1 flex items-center justify-center">
            <CheckBox title="Use the current image" check={useCurrentImage} setCheck={setUseCurrentImage} />
          </div>
          <p className="mt-4 flex items-center justify-center whitespace-pre-wrap leading-5">{originalDescription}</p>
        </article>
      </div>
      {level === 'image' && <PexelsImages openSubmit={openSubmit} />}
      {level === 'submit' && <GovSubmitNews />}
    </div>
  )
}

export default NewsPage
