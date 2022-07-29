import { createContext, Dispatch, SetStateAction, useState } from "react";


interface YoutubeContextProviderProps  { 
    children: React.ReactNode
 }

 export interface YoutubeContextProps {
    news: NewsProps
    setNews: Dispatch<SetStateAction<NewsProps>>
    descriptionArray: string[]
    setDescriptionArray: Dispatch<SetStateAction<Array<string>>>
    descriptionArrayToSend: string[]
    setDescriptionArrayToSend: Dispatch<SetStateAction<Array<string>>>
 }

export const YoutubeContext = createContext<YoutubeContextProps | {}>({});

export const YoutubeContextProvider = ({children}:YoutubeContextProviderProps) => {
    const [news,setNews]= useState<NewsProps>({
        title: '',
        description: '',
        createdAt: new Date(),
        _id: '',
        mediaInfo: {}
    })
    const [descriptionArray,setDescriptionArray] = useState<Array<string>>([])
    const [descriptionArrayToSend,setDescriptionArrayToSend] = useState<Array<string>>([])


    return (
        <YoutubeContext.Provider value={{news,setNews,descriptionArray,setDescriptionArray,descriptionArrayToSend,setDescriptionArrayToSend}}>
            {children}
        </YoutubeContext.Provider>
    )
}