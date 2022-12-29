import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useSession } from '../../auth/UserContext'
import GovSubmitNews from './GovSubmitNews'
import { NewsContext, NewsContextProps } from './NewsContext'
import PexelsImages from './PexelsImages'

const NewsPage = () => {
  const { level, setlevel, originalTitle, originalImage, originalDescription } =
    useContext(NewsContext) as NewsContextProps
  const [showMobile, setShowMobile] = useState(false)
  const { session } = useSession()

  const openPexelsImageForm = () => {
    setlevel('image')
  }

  useEffect(() => {
    if (level === 'image' && session?.device?.mobile) {
      setShowMobile(true)
    }
    if (level === 'submit' && session?.device?.mobile) {
      setShowMobile(true)
    }
  }, [level])

  return (
    <div
      className={`mt-4 ${
        level === 'read' ? 'mx-auto max-w-[1000px]' : 'lg:grid lg:grid-cols-2'
      }`}
    >
      <div className={`lg:px-2 ${showMobile ? 'hidden' : 'block'}`}>
        <article className="rounded-md border border-reddit_border bg-reddit_dark-brighter hover:border-reddit_text">
          <div
            className="mt-2 mb-4 flex items-center justify-center text-2xl font-bold"
            id="title"
          >
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
          <p className="mt-4 flex items-center justify-center whitespace-pre-wrap leading-5">
            {originalDescription}
          </p>
        </article>
      </div>
      {level === 'image' && <PexelsImages />}
      {level === 'submit' && <GovSubmitNews />}
    </div>
  )
}

export default NewsPage
