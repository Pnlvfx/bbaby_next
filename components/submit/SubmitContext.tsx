import axios from "axios";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import {AuthModalContext, AuthModalContextProps} from "../auth/AuthModalContext";
import UserContext from "../auth/UserContext";
import { TimeMsgContext, TimeMsgContextProps } from "../main/TimeMsgContext";

export const SubmitContext = createContext<SubmitContextType | {}>({})

interface SubmitContextProviderProps  { 
    children: React.ReactNode
 }

 export interface SubmitContextType {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    body: string
    setBody: Dispatch<SetStateAction<string>>
    height: number
    setHeight: Dispatch<SetStateAction<number>>
    width: number
    setWidth: Dispatch<SetStateAction<number>>
    selectedFile: string | null
    setSelectedFile: SetStateAction<any>
    selectedCommunity: string
    setSelectedCommunity: Dispatch<SetStateAction<string>>
    communityIcon: string
    setCommunityIcon: Dispatch<SetStateAction<string>>
    isImage: boolean
    setIsImage: Dispatch<SetStateAction<boolean>>
    isVideo: boolean
    setIsVideo: Dispatch<SetStateAction<boolean>>
    sharePostToTG: boolean
    setSharePostToTG: Dispatch<SetStateAction<boolean>>
    sharePostToTwitter: boolean
    setSharePostToTwitter: Dispatch<SetStateAction<boolean>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    createPost: Function
    }

export const SubmitContextProvider = ({children}:SubmitContextProviderProps) => {
    const {session} = useContext(UserContext)
    const authModalContext = useContext(AuthModalContext) as AuthModalContextProps;
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [width,setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    const [selectedCommunity,setSelectedCommunity] = useState('')
    const [communityIcon,setCommunityIcon] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [isImage,setIsImage] = useState(false)
    const [isVideo,setIsVideo] = useState(false)
    const [sharePostToTG,setSharePostToTG] = useState(session?.user.role === 1 ? true : false)
    const [sharePostToTwitter,setSharePostToTwitter] = useState(session?.user.role ? true : false)
    const [loading,setLoading] = useState(false)
    
    const router = useRouter()
    const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;


    const createPost = async() => {
        try {
            setLoading(true)
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const data = {title,body,community:selectedCommunity,communityIcon,selectedFile,isImage,isVideo,height,width,sharePostToTG,sharePostToTwitter}
            const res = await axios.post(`${server}/posts`, data, {withCredentials:true})
            if (session?.user.role === 0) {
                const {_id,community} = res.data
                router.push('/b/'+community+'/comments/'+_id)
            } else {
                setMessage({value:'Post created successfully',status: 'success'})
                setLoading(false)
            }
        } catch (err:any) {
            if(err.response.status === 401) {
                authModalContext.setShow('login');
            } else if (err?.response?.data?.msg) {
            setMessage({value: err.response.data.msg, status: 'error'})
            setLoading(false)
            //setShowSubmit(false)
            }
        }
    }
    return (
        <SubmitContext.Provider value={{
            title,
            setTitle,
            body,
            setBody,
            height,
            setHeight,
            width,
            setWidth,
            selectedCommunity,
            setSelectedCommunity,
            communityIcon,
            setCommunityIcon,
            selectedFile,
            setSelectedFile,
            isImage,
            setIsImage,
            isVideo,
            setIsVideo,
            sharePostToTG,
            setSharePostToTG,
            sharePostToTwitter,
            setSharePostToTwitter,
            loading,
            setLoading,
            createPost
            }}>
            {children}
        </SubmitContext.Provider>
    )
}