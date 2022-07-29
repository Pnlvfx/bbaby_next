import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { FcVideoProjector } from 'react-icons/fc'
import { YoutubeContext, YoutubeContextProps } from './YoutubeContext';
import YoutubeDescription from './YoutubeDescription';

const YoutubeNewsCard = () => {
    const {news:oneNews,descriptionArray,setDescriptionArray} = useContext(YoutubeContext) as YoutubeContextProps;
    useEffect(() => {
      if (oneNews.description) {
        setDescriptionArray(oneNews.description.split('\n\n'))
      }
    },[oneNews])

  return (
    <div className="flex justify-center lg:ml-4">
      <div className="w-full flex-none lg:mr-4 lg:w-10/12 xl:w-8/12 2xl:w-[1050px]">
        <div className="mb-3 rounded-md border border-reddit_border bg-reddit_dark-brighter p-2">
              <p className="font-bold mb-3">{oneNews?.title}</p>
            {oneNews &&
              oneNews?.mediaInfo?.isImage &&
              oneNews.mediaInfo?.image &&
              oneNews.mediaInfo?.width &&
              oneNews.mediaInfo?.height && (
                <div className='max-h-[500px] container relative overflow-hidden mb-3'>
                     <Image
                        src={oneNews.mediaInfo.image}
                        width={oneNews.mediaInfo.width}
                        height={oneNews.mediaInfo.height}
                        alt={oneNews.mediaInfo.alt}
                        objectFit='contain'
                        />
                </div>
              )}
            <div className="">
              {descriptionArray?.map((description,key) => (
                <ul key={key}>
                <YoutubeDescription description={description} />
                </ul>
              ))}
            </div>
            <div
              id="buttons"
              className="mt-2 mr-2 flex items-center rounded-sm text-reddit_text-darker"
            >
              <button className="flex rounded-md p-[10px] hover:bg-reddit_dark-brightest">
                <FcVideoProjector className="h-5 w-5" />
                <p className="ml-1 text-sm">Read More</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeNewsCard
