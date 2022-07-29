import axios from "axios";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface NewsContextProviderProps {
    children: React.ReactNode
}

export interface NewsContextProps {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    description: string
    setDescription: Dispatch<SetStateAction<string>>
    mediaInfo: mediaInfoProps
    setMediaInfo: Dispatch<SetStateAction<mediaInfoProps>>
    sharePostToTG: boolean
    setSharePostToTG: Dispatch<SetStateAction<boolean>>
    sharePostToTwitter: boolean
    setSharePostToTwitter: Dispatch<SetStateAction<boolean>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    createNews: Function
    }

export const NewsContext = createContext({})

export const NewsContextProvider = ({children}:NewsContextProviderProps) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [mediaInfo,setMediaInfo] = useState({});
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const createNews = async () => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const data = {title,description,mediaInfo}
            setLoading(true)
            const res = await axios.post(`${server}/governance/news`, data, {withCredentials:true})
            setLoading(false)
            router.push(`/news/${res.data._id}`)
        } catch (err) {
            if (err instanceof Error)
            if (axios.isAxiosError(err)) {
                setLoading(false);
                console.log(err.message)
            } else {
                setLoading(false)
                console.log(err)
            }
        }
    }

    return (
        <NewsContext.Provider value={{title,setTitle,description,setDescription,mediaInfo,setMediaInfo,loading,createNews}}>
            {children}
        </NewsContext.Provider>
    );
};