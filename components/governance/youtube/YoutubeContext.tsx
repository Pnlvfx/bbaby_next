import { createContext, Dispatch, SetStateAction, useState, ReactNode, useContext } from 'react'

interface YoutubeContextProviderProps {
  ssrNews: NewsProps
  children: ReactNode
}

interface YoutubeContextProps {
  news: NewsProps
  setNews: Dispatch<SetStateAction<NewsProps>>
  descriptionArrayToSend: string[]
  setDescriptionArrayToSend: Dispatch<SetStateAction<Array<string>>>
}

export const YoutubeContext = createContext<YoutubeContextProps | {}>({})

export const YoutubeContextProvider = ({ ssrNews, children }: YoutubeContextProviderProps) => {
  const [news, setNews] = useState<NewsProps>(ssrNews)
  const [descriptionArrayToSend, setDescriptionArrayToSend] = useState<Array<string>>([])

  return (
    <YoutubeContext.Provider
      value={{
        news,
        setNews,
        descriptionArrayToSend,
        setDescriptionArrayToSend,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  )
}

export const useYoutubeProvider = () => {
  const context = useContext(YoutubeContext) as YoutubeContextProps
  if (!context) {
    throw new Error('Youtube component must be used with YoutubeContextProvider component')
  }
  return context
}
