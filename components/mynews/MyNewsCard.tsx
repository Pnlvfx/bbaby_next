import Router from 'next/router'
import NewsButtons from './NewsButtons'

interface MyNewsCardProps {
  news: NewsProps
  isListing: boolean
}

const MyNewsCard = ({ news, isListing }: MyNewsCardProps) => {
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
        <p className="mt-2 truncate whitespace-pre-wrap text-base">
          {isListing
            ? news.description.substring(0, 250) + '...'
            : news.description}
        </p>
        <NewsButtons news={news} isListing={isListing} openNews={openNews} />
      </div>
    </div>
  )
}

export default MyNewsCard
