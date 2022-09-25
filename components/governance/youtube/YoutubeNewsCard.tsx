import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { YoutubeContext, YoutubeContextProps } from './YoutubeContext';
import YoutubeDescription from './YoutubeDescription';

const YoutubeNewsCard = (value: ValueProps) => {
    const {news:oneNews,descriptionArray,setDescriptionArray} = useContext(YoutubeContext) as YoutubeContextProps;
    
    useEffect(() => {
      if (oneNews.description) {
        setDescriptionArray(oneNews.description.split('\n\n'))
      }
    },[oneNews])

  return (
    <div className="w-full flex-none text-center lg:mr-4 lg:w-10/12 xl:w-8/12 2xl:w-[1050px]">
      <div className="mb-3 rounded-md border border-reddit_border bg-reddit_dark-brighter p-2">
        <p className="font-bold">{oneNews.title}</p>
        {oneNews && oneNews.mediaInfo &&
          oneNews?.mediaInfo?.isImage &&
          oneNews.mediaInfo?.image &&
          oneNews.mediaInfo?.width &&
          oneNews.mediaInfo?.height && (
            <>
            <div className='mt-2'>
              <div className='max-h-[520px] relative overflow-hidden'>
                <Image
                  src={oneNews.mediaInfo.image}
                  width={oneNews.mediaInfo.width}
                  height={oneNews.mediaInfo.height}
                  alt={oneNews.mediaInfo.alt}
                />
                <div 
                style={{width: oneNews.mediaInfo.width, height: oneNews.mediaInfo.height, color:value.textColor}}
                className={`text-[48px] absolute right-0 left-0 top-0 bottom-0 break-words pr-10`}>
                  {oneNews.title}
              </div>
              </div>
            </div>
            </>
          )}
          <div>
            {descriptionArray?.map((description,key) => (
              <ul key={key}>
                <YoutubeDescription description={description} />
              </ul>
            ))}
          </div>
      </div>
    </div>
  )
}

export default YoutubeNewsCard;

