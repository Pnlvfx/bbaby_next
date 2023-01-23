import Router from 'next/router'
import { useEffect } from 'react'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { catchErrorWithMessage } from '../API/common'
import { useAuthModal } from '../auth/modal/AuthModalContext'
import { useSession } from '../auth/UserContext'
import { postRequestHeaders, server } from '../main/config'
import { useMessage } from '../main/TimeMsgContext'
import { getUserInfo } from '../user_settings/user_settingsAPI'

export const SubmitContext = createContext<SubmitContextType | {}>({})

interface SubmitContextProviderProps {
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
  selectedFile: any
  setSelectedFile: SetStateAction<any>
  thumbnail: any
  setThumbnail: SetStateAction<any>
  selectedCommunity: string
  setSelectedCommunity: Dispatch<SetStateAction<string>>
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
  canPostOnTwitter: boolean
  createPost: Function
}

export const SubmitContextProvider = ({ children }: SubmitContextProviderProps) => {
  const { session } = useSession()
  const modalContext = useAuthModal()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [isImage, setIsImage] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const [canPostOnTwitter, setCanPostOnTwitter] = useState(false)
  const [sharePostToTG, setSharePostToTG] = useState(session?.user?.role === 1 ? true : false)
  const [sharePostToTwitter, setSharePostToTwitter] = useState(canPostOnTwitter && session?.user?.role ? true : false)
  const [loading, setLoading] = useState(false)
  const message = useMessage()

  const createPost = async () => {
    try {
      setLoading(true)
      const url = `${server}/posts`
      const _body = JSON.stringify({
        title,
        body,
        community: selectedCommunity,
        selectedFile,
        isImage,
        isVideo,
        height,
        width,
        sharePostToTG,
        sharePostToTwitter,
      })
      const res = await fetch(url, {
        method: 'post',
        body: _body,
        headers: postRequestHeaders,
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok) {
        if (session?.user?.role === 0) {
          const { _id, community } = data as PostProps
          Router.push('/b/' + community.toLowerCase() + '/comments/' + _id)
        } else {
          message.setMessage({
            value: 'Post created successfully',
            status: 'success',
          })
          setLoading(false)
        }
      } else {
        if (res.status === 401) {
          modalContext.setShow('login')
        } else {
          message.setMessage({ value: data?.msg, status: 'error' })
          setLoading(false)
        }
      }
    } catch (err) {
      catchErrorWithMessage(err, message)
      setLoading(false)
    }
  }

  useEffect(() => {
    const authorize = async () => {
      try {
        const userInfo = await getUserInfo()
        if (userInfo?.externalAccounts?.find((provider) => provider.provider === 'twitter')) {
          setCanPostOnTwitter(true)
          if (session?.user?.role === 1) {
            setSharePostToTwitter(true)
          }
        }
      } catch (err) {
        catchErrorWithMessage(err, message)
      }
    }
    authorize()
  }, [])

  return (
    <SubmitContext.Provider
      value={{
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
        thumbnail,
        setThumbnail,
        canPostOnTwitter,
        createPost,
      }}
    >
      {children}
    </SubmitContext.Provider>
  )
}
