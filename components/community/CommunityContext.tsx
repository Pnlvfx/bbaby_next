import { useRouter } from 'next/router'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import communityapis from '../API/communityapis'

export type CommunityContextProps = {
  show: boolean
  loading: boolean
  setShow: Dispatch<SetStateAction<Boolean>>
  getCommunity: (community: string) => Promise<void>
  refreshCommunity: Function
  communityInfo: CommunityProps
}

export const CommunityContext = createContext<CommunityContextProps | {}>({})

export const CommunityContextProvider = ({ children }: ChildrenProps) => {
  const [show, setShow] = useState(false)
  const [communityInfo, setCommunityInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const getCommunity = async (community: string) => {
    try {
      setLoading(true)
      const data = await communityapis.getCommunity(community)
      setCommunityInfo(data)
      setLoading(false)
    } catch (err) {
      setLoading(true)
    }
  }

  const refreshCommunity = async (community: string) => {
    try {
      const data = await communityapis.getCommunity(community)
      setCommunityInfo(data)
    } catch (err) {
      setLoading(true)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.community) {
      setTimeout(() => {
        setCommunityInfo({})
      }, 450)
    }
  }, [router])

  return (
    <CommunityContext.Provider
      value={{
        show,
        setShow,
        loading,
        getCommunity,
        refreshCommunity,
        communityInfo,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}
