import React from 'react'
import Effects from './Effects'
import ScrollObserver from './ScrollObserver'
import VideoPlayer from './VideoPlayer'
import { VideoPlayerContextProvider } from './VidePlayerContext'

interface VideoPlayerProps {
  url: string
  poster: string
  duration?: number
  scroll?: boolean
}

const Video = ({url, poster, duration, scroll}: VideoPlayerProps) => {
  return (
   <VideoPlayerContextProvider url={url} poster={poster} duration={duration}>
      <ScrollObserver enable={scroll}>
        <Effects>
          <VideoPlayer />
        </Effects>
      </ScrollObserver>
   </VideoPlayerContextProvider>
  )
}

export default Video;
