import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"

export type CommunityContextProps = {
    show: boolean
    loading: boolean
    setShow: Dispatch<SetStateAction<Boolean>>
    getCommunity: Function;
    communityInfo: CommunityProps;
}

export const CommunityContext = createContext<CommunityContextProps | {}>({});

interface CommunityContextProviderProps {
    children : ReactNode
}

export const CommunityContextProvider = ({ children }: CommunityContextProviderProps) => {
    const [show,setShow] = useState(false);
    const [communityInfo,setCommunityInfo] = useState({});
    const [loading,setLoading] = useState(true);
    const router = useRouter()
    
    const getCommunity = async (community: string) => {
        try {
            setLoading(true)
            const server = process.env.NEXT_PUBLIC_SERVER_URL;
            const url = `${server}/communities/${community}`
            const res = await fetch(url, {
                method: 'get',
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json();
                setCommunityInfo(data);
                setLoading(false)
            } else {
                setLoading(true);
            }
        } catch (err) {
            setLoading(true)
        }
    }
  
    useEffect(() => {
        if (!router.isReady) return;
        if (!router.query.community) {
            setTimeout(() => {
                setCommunityInfo({})
            }, 450);
        }
    }, [router])

    return (
        <CommunityContext.Provider value={{show, setShow, loading, getCommunity, communityInfo}}>
            {children}
        </CommunityContext.Provider>
    );
}