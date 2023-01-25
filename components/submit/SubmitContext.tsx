import { useContext } from 'react'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { useSession } from '../auth/UserContext'

const SubmitContext = createContext<SubmitContextType | {}>({})

interface SubmitContextType {
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
}

export const SubmitContextProvider = ({ children }: ChildrenProps) => {
  const { session } = useSession()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [thumbnail, setThumbnail] = useState(null)
  const [isImage, setIsImage] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const [sharePostToTG, setSharePostToTG] = useState(session?.user?.role === 1 ? true : false)
  const [sharePostToTwitter, setSharePostToTwitter] = useState(false)

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
        thumbnail,
        setThumbnail,
      }}
    >
      {children}
    </SubmitContext.Provider>
  )
}

export const useSubmitProvider = () => {
  const context = useContext(SubmitContext) as SubmitContextType
  if (!context) {
    throw new Error('Session component must be used with UserContextProvider component')
  }
  return context
}
