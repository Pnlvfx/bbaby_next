import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { catchErrorWithMessage } from "../../API/common";
import { TimeMsgContext, TimeMsgContextProps } from "../../main/TimeMsgContext";

interface NewsContextProviderProps {
    children: React.ReactNode
}

export interface NewsContextProps {
    level: 'read' | 'image' | 'submit' | 'comments'
    setlevel: Dispatch<SetStateAction<'read' | 'image' | 'submit' | 'comments'>>
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
    const [level, setlevel] = useState<'read' | 'image' | 'submit' | 'comments'>('read')
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [mediaInfo,setMediaInfo] = useState({});
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const message = useContext(TimeMsgContext) as TimeMsgContextProps;

    const createNews = async () => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const body = JSON.stringify({title,description,mediaInfo})
            const url = `${server}/governance/news`
            setLoading(true)
            const res = await fetch(url, {
                method: 'POST',
                body,
                credentials: 'include'
            })
            const data = await res.json();
            if (!res.ok) {

            } else {
                setLoading(false)
                router.push(`/news/${data._id}`)
            }
        } catch (err) {
            catchErrorWithMessage(err, message);
        }
    }

    return (
        <NewsContext.Provider value={{
            level,
            setlevel,
            title,
            setTitle,
            description,
            setDescription,
            mediaInfo,
            setMediaInfo,
            loading,
            createNews
            }}>
            {children}
        </NewsContext.Provider>
    );
};