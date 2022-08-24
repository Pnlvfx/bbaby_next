type VideoPlayer = {
    src: string,
    controls: boolean
    width: number
    height: number
}

const VideoPlayer = ({src, controls, width, height} : VideoPlayer) => {
    
  return (
    <div>
        <video
            //style={{aspectRatio: '16/9'}}
            className={`aspect-video`}
            src={src}
            controls={controls}
            width={width}
            height={height}
        />
    </div>
  )
}

export default VideoPlayer;