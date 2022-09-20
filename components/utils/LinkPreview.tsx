import Link from 'next/link';

export interface LinkPreviewProps {
    title: string
    description: string
    image: string
    hostname?: string
    siteName?: string
    link: string //*the link of the original article*\\
}

const containerClass = `overflow-hidden border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px] h-[550px]`

const LinkPreview = ({title, description, image, hostname, link, siteName }: LinkPreviewProps) => {
    const url = `/governance/news/${title.substring(0, 75).replace('?', '')}`
    const query = `link=${link}&imageUrl=${image}&title=${title}`
    const finalUrl = `${url}?${query}`;
    return (
        <div className={containerClass}>
            <Link href={finalUrl}>
                <a>
                    <div className='p-2'>
                        <div className='w-full mb-4 text-lg text-center flex-none'>
                            <p className='font-bold truncate'>{title}</p>
                        </div>
                        <div className='mb-4 flex items-center justify-center'>
                            <img 
                                src={image} 
                                height={350} 
                                alt='Post Image' 
                                width={700} 
                            />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-lg'>{description}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default LinkPreview;

export const LinkPreviewLoader = () => {
    return (
      <div className={containerClass}>
          <div className='p-2'>
              <div className={`w-full mb-4 text-lg text-center h-[28px] loading`} />
              <div className='mb-4 flex items-center justify-center h-[350px] loading' />
              <div className='flex justify-center min-h-[300px] loading' />
          </div>
      </div>
    )
}
