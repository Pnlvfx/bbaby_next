import Router from 'next/router'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { useSession } from '../../auth/UserContext'
import { postRequestHeaders, server } from '../../main/config'
import { useMessage } from '../../main/TimeMsgContext'

interface NewsContextProviderProps extends ChildrenProps {
  originalTitle: string
  originalDescription: string
  originalImage: string
}

interface NewsContextProps {
  level: 'read' | 'image' | 'submit' | 'comments'
  setlevel: Dispatch<SetStateAction<'read' | 'image' | 'submit' | 'comments'>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  originalTitle: string
  originalDescription: string
  originalImage: string
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  mediaInfo: mediaInfoProps
  setMediaInfo: Dispatch<SetStateAction<mediaInfoProps>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  sharePostToTG: boolean
  setSharePostToTG: Dispatch<SetStateAction<boolean>>
  sharePostToTwitter: boolean
  setSharePostToTwitter: Dispatch<SetStateAction<boolean>>
  createNews: () => Promise<void>
}

const NewsContext = createContext({})

export const NewsContextProvider = ({ children, originalTitle, originalDescription, originalImage }: NewsContextProviderProps) => {
  const { session } = useSession()
  const [level, setlevel] = useState<'read' | 'image' | 'submit' | 'comments'>('read')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mediaInfo, setMediaInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [sharePostToTG, setSharePostToTG] = useState(session?.user?.role === 1 && process.env.NODE_ENV === 'production' ? true : false)
  const [sharePostToTwitter, setSharePostToTwitter] = useState(false)
  const message = useMessage()

  const createNews = async () => {
    try {
      setLoading(true)
      const body = JSON.stringify({
        title,
        description,
        mediaInfo,
        sharePostToTG,
        sharePostToTwitter,
      })
      const url = `${server}/governance/news`
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      Router.push(data.permalink)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <NewsContext.Provider
      value={{
        level,
        setlevel,
        originalTitle,
        originalDescription,
        originalImage,
        title,
        setTitle,
        description,
        setDescription,
        mediaInfo,
        setMediaInfo,
        loading,
        sharePostToTG,
        setSharePostToTG,
        sharePostToTwitter,
        setSharePostToTwitter,
        createNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export const useNewsProvider = () => {
  const context = useContext(NewsContext) as NewsContextProps
  if (!context) {
    throw new Error('Session component must be used with UserContextProvider component')
  }
  return context
}
