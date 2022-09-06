import { useContext } from "react";
import Controls from "./Controls";
import { handlePlayPause } from "./utils/hooks";
import { VideoPlayerContext, VideoPlayerContextProps } from "./VidePlayerContext";

const VideoPlayer = () => {
  const {player, url, poster, videoContainerRef} = useContext(VideoPlayerContext) as VideoPlayerContextProps;

  return (
    <div 
      ref={videoContainerRef} 
      onClick={(e) => {
        e.preventDefault()
        handlePlayPause(player);
        e.stopPropagation()
      }} 
      className="h-full whitespace-nowrap overflow-hidden relative cursor-default w-full"
    >
      <video className="z-0 h-full top-0 left-0 absolute w-full bg-[rgb(0,0,0)]"
        ref={player}
        style={{
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
        poster={poster}
        autoPlay={false}
        muted
        playsInline
      >
        <source src={url} />
      </video>
      <Controls />
    </div>
  )
}

export default VideoPlayer;