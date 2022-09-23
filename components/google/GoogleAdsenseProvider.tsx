import Script from "next/script";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export interface GoogleAdsenseProps {
    loadedSuccessfully: boolean
    unfilled: boolean
    setUnfilled: Dispatch<SetStateAction<boolean>>
}

const GoogleAdsenseContext = createContext<GoogleAdsenseProps | {}>({})

interface GoogleAdContextProviderProps {
    children: ReactNode
}

export const GoogleAdsProvider = ({children}: GoogleAdContextProviderProps) => {
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
    const [unfilled, setUnfilled] = useState(false);

    return (
        <GoogleAdsenseContext.Provider value={{
            loadedSuccessfully,
            unfilled,
            setUnfilled
        }}>
            {process.env.NEXT_PUBLIC_NODE_ENV === 'production' &&
             <Script 
                id="Adsense-id"
                async
                onError={(e) => {console.log("Adsense failed to load", e)}}
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7203519143982992"
                crossOrigin="anonymous"
                onLoad={(e) => {
                    setLoadedSuccessfully(true);
                }}
            />}
            {children}
        </GoogleAdsenseContext.Provider>
    )
}

export const useGoogleAdContext = () => {
    const context = useContext(GoogleAdsenseContext)
    if (!context) {
        throw new Error(
        'Google Adsense components must be used within GoogleAdsProvider',
        );
    }
    return context;
}