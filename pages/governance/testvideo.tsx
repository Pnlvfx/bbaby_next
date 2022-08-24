import React from 'react'
import VideoPlayer from '../../components/utils/video/VideoPlayer';

const Testvideo = () => {
  return (
    <div>
      <VideoPlayer 
      src='http://localhost:8080/videos'
      controls={true}
      height={599}
      width={599}
      />
    </div>
  )
}

export default Testvideo;