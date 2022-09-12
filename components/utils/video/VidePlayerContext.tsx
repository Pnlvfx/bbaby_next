import { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useRef, useState } from "react";

export interface VideoPlayerContextProps {
    player: MutableRefObject<HTMLVideoElement>
    url: string | [{
        url: string
    }]
    poster: string
    timelineRef: MutableRefObject<HTMLDivElement>
    duration: string
    setDuration: Dispatch<SetStateAction<string>>
    played: string
    setPlayed: Dispatch<SetStateAction<string>>
    isPlaying: boolean
    setIsPlaying: Dispatch<SetStateAction<boolean>>
    progressPosition: number
    setprogressPosition: Dispatch<SetStateAction<number>>
    videoContainerRef: MutableRefObject<HTMLDivElement>
    timelineBall: MutableRefObject<HTMLDivElement>
    previewPositionRef: MutableRefObject<HTMLDivElement>
    isEnded: boolean 
    setIsEnded: Dispatch<SetStateAction<boolean>>
    volumeSlider: MutableRefObject<HTMLDivElement>
    volumeSliderContainer: MutableRefObject<HTMLDivElement>
    isMuted: boolean 
    setIsMuted: Dispatch<SetStateAction<boolean>>
    controls: boolean 
    setControls: Dispatch<SetStateAction<boolean>>
    loading: boolean 
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const VideoPlayerContext = createContext<VideoPlayerContextProps | {}>({})

interface VideoPlayerContextProviderProps {
    children: ReactNode
    url: string
    duration?: number
    poster: string
}

export const VideoPlayerContextProvider = ({children, url, poster}: VideoPlayerContextProviderProps) => {
    const previewPositionRef = useRef(null)
    const volumeSlider = useRef(null)
    const volumeSliderContainer = useRef(null)
    const timelineBall = useRef(null)
    const videoContainerRef = useRef(null)
    const player = useRef(null);
    const timelineRef = useRef(null)
    const [progressPosition, setprogressPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('0:00');
    const [played, setPlayed] = useState('0:00')
    const [isEnded, setIsEnded] = useState(false);
    const [controls, setControls] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    return (
        <VideoPlayerContext.Provider value={{
            player,
            url,
            poster,
            timelineRef,
            duration,
            setDuration,
            played,
            setPlayed,
            isPlaying,
            setIsPlaying,
            progressPosition, 
            setprogressPosition,
            videoContainerRef,
            timelineBall,
            previewPositionRef,
            isEnded,
            setIsEnded,
            volumeSlider,
            volumeSliderContainer,
            isMuted,
            setIsMuted,
            controls,
            setControls,
            loading,
            setLoading
        }}>
            {children}
        </VideoPlayerContext.Provider>
    )
}