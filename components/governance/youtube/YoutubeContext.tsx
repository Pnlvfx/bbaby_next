import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react'

interface YoutubeContextProviderProps {
  ssrNews: NewsProps
  children: ReactNode
}

interface YoutubeContextProps {
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
  const [descriptionArrayToSend, setDescriptionArrayToSend] = useState<
    Array<string>
  >([])

  useEffect(() => {
    if (!ssrNews) return
    setNews(ssrNews)
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

export const useYoutubeProvider = () => {
  const context = useContext(YoutubeContext) as YoutubeContextProps
  if (!context) {
    throw new Error(
      'Youtube component must be used with YoutubeContextProvider component'
    )
  }
  return context
}
