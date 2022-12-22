import Link from 'next/link'
import Router from 'next/router'
import { AiOutlineRead } from 'react-icons/ai'
import { FcVideoProjector } from 'react-icons/fc'
import { useSession } from '../auth/UserContext'
import ShareButton from '../post/postutils/ShareButton'

interface MyNewsCardProps {
  news: NewsProps
  isListing: boolean
}

const MyNewsCard = ({ news, isListing }: MyNewsCardProps) => {
  const { session } = useSession()

  const openNews = () => {
    Router.push(news.permalink)
  }

  return (
    <div className="mb-3 flex justify-center rounded-md border border-reddit_border bg-reddit_dark-brighter">
      <div
        className={`${isListing && 'cursor-pointer'} p-2`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          isListing ? openNews() : null
        }}
      >
        <p className="mb-2 text-center font-bold">{news.title}</p>
        {news.mediaInfo.isImage &&
          news.mediaInfo.image &&
          news.mediaInfo.width &&
          news.mediaInfo.height &&
          news.mediaInfo.alt && (
            <picture className="max-h-[510px] overflow-hidden">
              <img
                src={news.mediaInfo.image}
                width={news.mediaInfo.width}
                height={news.mediaInfo.height}
                alt={news.mediaInfo.alt}
              />
            </picture>
          )}
        <p className="mt-2 truncate whitespace-pre-wrap">
          {isListing
            ? news.description.substring(0, 250) + '...'
            : news.description}
        </p>
        <div
          id="buttons"
          className="mt-2 mr-2 flex items-center rounded-sm text-[12px] font-bold text-reddit_text-darker"
        >
          {isListing ? (
            <Link
              href={news.permalink}
              type="button"
              className="flex rounded-md p-[10px] hover:bg-reddit_dark-brightest"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                openNews()
              }}
            >
              <AiOutlineRead className="h-5 w-5" />
              <p className="ml-1 text-sm">News</p>
            </Link>
          ) : (
            <div className="flex rounded-md p-[10px] hover:bg-reddit_dark-brightest">
              <AiOutlineRead className="h-5 w-5" />
              <p className="ml-1 text-sm">News</p>
            </div>
          )}
          {session?.user?.role === 1 && (
            <>
              <Link
                href={`/governance/youtube?title=${news.title}`}
                className="flex rounded-md p-[10px] hover:bg-reddit_dark-brightest"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  Router.push({
                    pathname: `/governance/youtube`,
                    query: { title: news.title },
                  })
                }}
              >
                <FcVideoProjector className="h-5 w-5" />
                <p className="ml-1 text-sm">Create video</p>
              </Link>
              <button className="flex rounded-md p-[10px] hover:bg-reddit_dark-brightest">
                <AiOutlineRead className="h-5 w-5" />
                <p className="ml-1 text-sm">Edit News</p>
              </button>
            </>
          )}
          <ShareButton linkToCopy={news.permalink} isListing={isListing} />
        </div>
      </div>
    </div>
  )
}

export default MyNewsCard
