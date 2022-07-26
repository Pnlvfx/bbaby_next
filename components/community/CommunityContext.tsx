import axios from "axios";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

export type CommunityContextProps = {
    show: boolean
    loading: boolean
    setShow: Dispatch<SetStateAction<Boolean>>
    getCommunity: Function;
    communityInfo: CommunityProps;
}

export const CommunityContext = createContext<CommunityContextProps | {}>({});

interface CommunityContextProviderProps {
    children : React.ReactNode
}

export const CommunityContextProvider = ({children}:CommunityContextProviderProps) => {
    const [show,setShow] = useState(false);
    const [communityInfo,setCommunityInfo] = useState({});
    const [loading,setLoading] = useState(true);
    
    const getCommunity = async (community:string) => {
        try {
            setLoading(true)
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const res = await axios.get(server+'/communities/'+community, {withCredentials:true})
                setCommunityInfo(res.data);
                setLoading(false)
        } catch (err) {
            setLoading(true)
        }
    }

    const router = useRouter()
  
    useEffect(() => {
        if (!router.isReady) return
      if (!router.query.community) {
        setTimeout(() => {
            setCommunityInfo({})
        },450)
      }
    },[router])

    return (
        <CommunityContext.Provider value={{show,setShow,loading, getCommunity, communityInfo}}>
            {children}
        </CommunityContext.Provider>
    );
}