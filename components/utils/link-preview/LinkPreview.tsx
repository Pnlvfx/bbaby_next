import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LinkPreviewProps {
    description?: string
    hostname?: string
    image?: string
    siteName?: string
    title?: string
}

type LinkPreviewInputProps = {
    url: string
    index: number
}

const LinkPreview = ({url, index}: LinkPreviewInputProps) => {
    const [news,setNews] = useState<LinkPreviewProps>({})

    const fetcher = async () => {
        const server = process.env.API_LINK_PREVIEW_URL;
        const response = await fetch(`${server}/v2?url=${url}`);
        const json = await response.json()
        const newsInfo = json.metadata
        return newsInfo as LinkPreviewProps
      }

    useEffect(() => {
        if (!url) return;
        fetcher().then((res) => {
            setNews(res)
        })
    },[url])


  return (
    <>
    {news && news.image && news.title && (
        <div className='border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px] h-[550px] overflow-clip'>
        <Link href={`/governance/news/${index}?url=${url}&imageUrl=${news.image}&title=${news.title}`}>
            <a>
                <div className='p-2'>
                    <div className='w-full mb-4 text-lg text-center flex-none'>
                        <p className='font-bold truncate'>{news.title}</p>
                    </div>
                    <div className='mb-4 flex items-center justify-center'>
                        <img src={news.image} height={350} alt='' width={700}/>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-lg'>{news.description}</p>
                    </div>
                </div>
            </a>
        </Link>
    </div>
    )}
    </>
  )
}

export default LinkPreview;

// export const LinkPreviewLoader = () => {
//     return (
//       <div className='overflow-hidden border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px] h-[550px]'>
//           <div className='p-2'>
//               <div className={`w-full mb-4 text-lg text-center h-[28px] loading`} />
//               <div className='mb-4 flex items-center justify-center h-[350px] loading' />
//               <div className='flex justify-center min-h-[300px] loading' />
//           </div>
//       </div>
//     )
//   }
