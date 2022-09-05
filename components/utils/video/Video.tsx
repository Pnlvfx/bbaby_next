import React from 'react'
import Effects from './Effects'
import ScrollObserver from './ScrollObserver'
import VideoPlayer from './VideoPlayer'
import { VideoPlayerContextProvider } from './VidePlayerContext'

interface VideoPlayerProps {
  url: string
  poster: string
}

const Video = ({url, poster}: VideoPlayerProps) => {
  return (
   <VideoPlayerContextProvider url={url} poster={poster}>
      <ScrollObserver enable={false}>
        <Effects>
          <VideoPlayer />
        </Effects>
      </ScrollObserver>
   </VideoPlayerContextProvider>
  )
}

export default Video;
