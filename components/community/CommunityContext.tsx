import axios from "axios";
import { createContext, SetStateAction, useEffect, useState } from "react"

type CommunityContextProps = {
    show: boolean
    setShow: SetStateAction<Boolean>
    community: string
    setCommunity: SetStateAction<string>
}

export const CommunityContext = createContext<CommunityContextProps | any>({});

export function CommunityContextProvider({children}:any) {
    const [show,setShow] = useState(false);
    const [community,setCommunity] = useState();
    const [communityInfo,setCommunityInfo] = useState({});
    const [loading,setLoading] = useState(true)
    

    const refreshCommunity = () => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
            axios.get(server+'/communities/'+community, {withCredentials:true})
                .then(response => {
                    setCommunityInfo(response.data);
                    setLoading(false)
            })
    }


    useEffect(() => {
        if(community === undefined) return
        refreshCommunity()
    },[community])



    return (
        <CommunityContext.Provider value={{show,setShow, community,setCommunity,loading, refreshCommunity, ...communityInfo}}>
            {children}
        </CommunityContext.Provider>
    );
}

