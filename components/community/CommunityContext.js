import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const CommunityContext = createContext({});

export function CommunityContextProvider({children}) {
    const [show,setShow] = useState(false);
    const [community,setCommunity] = useState();
    const [communityInfo,setCommunityInfo] = useState({});
    const [loading,setLoading] = useState(true)
    

    useEffect(() => {
        if(community === undefined) return
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        axios.get(server+'/communities/'+community, {withCredentials:true})
            .then(response => {
                setCommunityInfo(response.data);
                setLoading(false)
            })
    },[community])

    return (
        <CommunityContext.Provider value={{show,setShow, community,setCommunity,loading, ...communityInfo}}>
            {children}
        </CommunityContext.Provider>
    );
}

