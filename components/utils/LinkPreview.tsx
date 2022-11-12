import Link from 'next/link';
import TimeAgo from 'timeago-react';

export interface LinkPreviewProps {
    title: string
    url: string
    image: string
    date: string
    description: string
}

const LinkPreview = ({title, url, image, date, description }: LinkPreviewProps) => {
    return (
        <div className={`overflow-hidden border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px] h-[500px]`}>
            <Link href={url}>
                <div className='w-full mb-4 text-lg text-center flex-none'>
                    <p className='font-bold truncate'>{title}</p>
                </div>
                <div className='mb-4 flex items-center justify-center max-h-[350px] overflow-hidden'>
                    <picture>
                        <img
                            src={image} 
                            height={350} 
                            alt='Link Image' 
                            width={700}
                        />
                    </picture>
                </div>
                <div className='flex mt-2 text-reddit_text-darker text-sm'>
                    <div>
                        <span>Description length: {description.length}</span>
                    </div>
                    <TimeAgo className='ml-auto' datetime={date} />
                </div>
            </Link>
        </div>
    )
}

export default LinkPreview;

export const LinkPreviewLoader = () => {
    return (
      <div className={`overflow-hidden border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px] h-[500px]`}>
          <div className='p-2'>
              <div className={`w-full mb-4 text-lg text-center h-[28px] loading`} />
              <div className='mb-4 flex items-center justify-center h-[350px] loading' />
              <div className='flex justify-center min-h-[300px] loading' />
          </div>
      </div>
    )
}
