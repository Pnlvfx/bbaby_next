import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import GovSubmitNews from './GovSubmitNews';
import { NewsContext, NewsContextProps } from './NewsContext';
import PexelsImages from './PexelsImages';

const NewsPage = () => {
  const { level, setlevel, originalTitle, originalImage, originalDescription } = useContext(NewsContext) as NewsContextProps
  const [showMobile, setShowMobile] = useState(false);

  const openPexelsImageForm = () => {
    setlevel('image')
  }

  useEffect(() => {
    if (level === 'image' && isMobile) {
      setShowMobile(true);
    } 
    if (level === 'submit' && isMobile) {
      setShowMobile(true);
    }
  }, [level])

  return (
    <div className="mt-4 flex justify-center">
        <div className={`w-full lg:w-8/12 xl:w-5/12 2xl:w-[850px] ${showMobile ? 'hidden' : 'block'} `}>
          <div
            id="article"
            className="rounded-md border border-reddit_border bg-reddit_dark-brighter hover:border-reddit_text lg:ml-4"
          >
            <div
              id="title"
            >
              <p className="mb-4 text-center text-2xl font-bold">
                {originalTitle}
              </p>
            </div>
            <div title='Open pexels search'
              className="flex cursor-pointer justify-center"
              onClick={(e) => {
                e.preventDefault();
                openPexelsImageForm();
              }}
            >
              <img
                src={originalImage} 
                alt="" 
              />
            </div>
            <p className="whitespace-pre-wrap">{originalDescription}</p>
          </div>
        </div>
      {level === 'image' && <PexelsImages />}
      {level === 'submit' && <GovSubmitNews />}
    </div>
  )
}

export default NewsPage;


