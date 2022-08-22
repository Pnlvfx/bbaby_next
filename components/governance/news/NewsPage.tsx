import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { translate } from '../../API/governance/governanceAPI';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import GovSubmitNews from './GovSubmitNews';
import { NewsContext, NewsContextProps } from './NewsContext';
import PexelsImages from './PexelsImages';

interface NewPageProps {
  title: string
  description: string
  image: string
}

const NewsPage = ({ title: originalTitle, description: originalDescription, image }: NewPageProps) => {
  const isEdit = 'w-full lg:w-8/12 xl:w-5/12 2xl:w-[850px]'
  const language = 'en'
  const [level, setlevel] = useState<'read' | 'image' | 'mobileImage' | 'submit' | 'comments'>('read')
  const { setTitle, setDescription, mediaInfo } = useContext(NewsContext) as NewsContextProps
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

  const openPexelsImageForm = async () => {
    setlevel('image')
  }

  const openSubmit = async () => {
    if (!mediaInfo.image) {
      openPexelsImageForm()
    } else {
      const res1 = await translate(originalTitle, language)
      const res2 = await translate(originalDescription, language)
      if (res1.ok && res2.ok) {
        if (res1 instanceof Response && res2 instanceof Response) {
          const title = await res1.json();
          const description = await res2.json();
          setTitle(title);
          setDescription(description)
          setlevel('submit')
        }
      } else {
        if (res1 instanceof Response && res2 instanceof Response) {
          const error = await res1.json();
          setMessage({value: error.msg, status: 'error'})
        } else {
          const error = res1 as FetchError
          setMessage({value: error.msg, status: 'error'})
        }
      }
    }
  }

  useEffect(() => {
    if (!isMobile) return;
    if (level === 'image') {
      if (isMobile) {
        setlevel('mobileImage')
      }
    }
  }, [level])

  return (
    <div className="mt-4 flex justify-center">
      <div className={`${isEdit}`}>
        {level !== 'mobileImage' && (
          <div
            id="article"
            className="rounded-md border border-reddit_border bg-reddit_dark-brighter hover:border-reddit_text lg:ml-4"
          >
            <div
              id="title"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                openSubmit();
              }}
            >
              <p className="mb-4 text-center text-2xl font-bold">
                {originalTitle}
              </p>
            </div>
            <div title='Open pexels search'
              onClick={(e) => {
                e.preventDefault();
                openPexelsImageForm();
              }}
              className="flex cursor-pointer justify-center"
            >
              <img src={image} alt="" />
            </div>
            <p className="whitespace-pre-wrap">{originalDescription}</p>
          </div>
        )}
      </div>
      {level === 'image' && <PexelsImages />}
      {level === 'mobileImage' && <PexelsImages />}
      {level === 'submit' && <GovSubmitNews />}
    </div>
  )
}

export default NewsPage;

