import Link from 'next/link'
import TimeAgo from 'timeago-react'

export interface LinkPreviewProps {
  title: string
  url: string
  image: string
  date: string
  description: string
}

const LinkPreview = ({
  title,
  url,
  image,
  date,
  description,
}: LinkPreviewProps) => {
  return (
    <div
      className={`mb-3 h-[450px] mx-auto max-w-[700px] overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter xl:mx-2`}
    >
      <Link href={url}>
        <div className="mb-4 w-full flex-none text-center text-lg">
          <p className="truncate font-bold">{title}</p>
        </div>
        <div className="mb-4 flex max-h-[350px] items-center justify-center overflow-hidden">
          <picture>
            <img src={image} height={350} alt="Link Image" width={700} />
          </picture>
        </div>
        <div className="mt-2 flex text-sm text-reddit_text-darker">
          <div>
            <span>Description length: {description.length}</span>
          </div>
          <TimeAgo className="ml-auto" datetime={date} />
        </div>
      </Link>
    </div>
  )
}

export default LinkPreview

export const LinkPreviewLoader = () => {
  return (
    <div
      className={`mb-3 h-[500px] max-w-[700px] overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter xl:mx-2`}
    >
      <div className="p-2">
        <div className={`loading mb-4 h-[28px] w-full text-center text-lg`} />
        <div className="loading mb-4 flex h-[350px] items-center justify-center" />
        <div className="loading flex min-h-[300px] justify-center" />
      </div>
    </div>
  )
}
