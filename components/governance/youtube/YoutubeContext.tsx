import { createContext, Dispatch, SetStateAction, useState, ReactNode, useEffect } from 'react';

interface YoutubeContextProviderProps {
  ssrNews: NewsProps
  children: ReactNode
}

export interface YoutubeContextProps {
  news: NewsProps
  setNews: Dispatch<SetStateAction<NewsProps>>
  descriptionArray: string[]
  setDescriptionArray: Dispatch<SetStateAction<Array<string>>>
  descriptionArrayToSend: string[]
  setDescriptionArrayToSend: Dispatch<SetStateAction<Array<string>>>
}

export const YoutubeContext = createContext<YoutubeContextProps | {}>({})

export const YoutubeContextProvider = ({
  ssrNews,
  children,
}: YoutubeContextProviderProps) => {
  const [news, setNews] = useState<NewsProps | {}>({})
  const [descriptionArray, setDescriptionArray] = useState<Array<string>>([])
  const [descriptionArrayToSend, setDescriptionArrayToSend] = useState<Array<string>>([])

  useEffect(() => {
    if (!ssrNews) return;
    setNews(ssrNews);
  }, [ssrNews])

  return (
    <YoutubeContext.Provider
      value={{
        news,
        setNews,
        descriptionArray,
        setDescriptionArray,
        descriptionArrayToSend,
        setDescriptionArrayToSend,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  )
}
