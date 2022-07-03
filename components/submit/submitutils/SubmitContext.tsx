import axios from "axios";
import {createContext, useState } from "react";

export const SubmitContext = createContext<PostProps | {}>({})

type PostProps = {
    loading: boolean
    title: string
    body: string
    isImage: boolean
    selectedCommunity: string
    communityIcon: string
    image: string
    imageHeight: number
    imageWidth: number
    imageId: string
    sharePostToTG: boolean
    sharePostToTwitter: boolean
}

export function SubmitContextProvider({children}:any) {
    const _post = {
        loading : false,
        title: '',
        body: '',
        isImage: false,
        selectedCommunity: '',
        communityIcon: '',
        image: '',
        imageHeight: 0,
        imageWidth: 0,
        imageId: '',
        sharePostToTG : false,
        sharePostToTwitter: false
    }
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const [post,setPost] = useState<PostProps>(_post)
    
    const createPost = async() => {
        try {
            if (post.isImage) {
                
            }
            const data = {
                title: post.title,
                body:post.body,
                community: post.selectedCommunity,
                communityIcon: post.communityIcon,
                image: post.isImage,
                imageHeight: post.imageHeight,
                imageWidth: post.imageWidth,
                imageId: post.imageId,
                sharePostToTG: post.sharePostToTG,
                sharePostToTwitter: post.sharePostToTwitter
            }
            const res = await axios.post(`${server}/posts`, data, {withCredentials:true})

        } catch (err) {
            
        }
    }


    return (
        <SubmitContext.Provider value={{setPost, ...post}}>
            {children}
        </SubmitContext.Provider>
    )   
}