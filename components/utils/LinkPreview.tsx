import Link from 'next/link';
import TimeAgo from 'timeago-react';

export interface LinkPreviewProps {
    title: string
    description: string
    image: string
    hostname?: string
    siteName?: string
    createdAt?: string
}

const containerClass = `overflow-hidden border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px]`

const LinkPreview = ({title, description, image, hostname, siteName, createdAt }: LinkPreviewProps) => {
    const url = `/governance/news/${title}`
    return (
        <div className={`${containerClass} h-[500px]`}>
            <Link href={url.toLowerCase().replaceAll(' ', '_')}>
                <a>
                    <div className='p-2'>
                        <div className='w-full mb-4 text-lg text-center flex-none'>
                            <p className='font-bold truncate'>{title}</p>
                        </div>
                        <div className='mb-4 flex items-center justify-center'>
                            <picture>
                                <img
                                    src={image} 
                                    height={350} 
                                    alt='Link Image' 
                                    width={700}
                                />
                            </picture>
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-lg'>{description}</p>
                        </div>
                        {createdAt && (
                            <div className='flex mt-2'>
                                <TimeAgo className='ml-auto text-reddit_text-darker text-sm' datetime={createdAt} />
                            </div>
                        )}
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default LinkPreview;

export const LinkPreviewLoader = () => {
    return (
      <div className={`${containerClass} h-[500px]`}>
          <div className='p-2'>
              <div className={`w-full mb-4 text-lg text-center h-[28px] loading`} />
              <div className='mb-4 flex items-center justify-center h-[350px] loading' />
              <div className='flex justify-center min-h-[300px] loading' />
          </div>
      </div>
    )
}
