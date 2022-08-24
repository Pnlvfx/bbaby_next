import { useEffect, useRef, useState } from "react";

type VideoPlayer = {
    src: string
    poster: string
    width: number
    height: number
}

const VideoPlayer = ({src, poster, width, height} : VideoPlayer) => {
  const videoRef = useRef(null);
  const [controls, setControls] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    console.log(entry.isIntersecting)
    setAutoplay(entry.isIntersecting);
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    setTimeout(() => {
      const observer = new IntersectionObserver(callback, options);
      if (videoRef.current) observer.observe(videoRef.current);
      return () => {
        if (videoRef.current) observer.unobserve(videoRef.current);
      }
    },500)
  }, [videoRef])

  return (
    <>
      <video
        ref={videoRef}
        onMouseOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setControls(true);
        }}
        onMouseOut={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setControls(false)
        }}
        style={{backgroundColor: 'rgb(0,0,0)', aspectRatio: '16/9'}}
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        muted={true}
        height={height}
        width={width}
      />
    </>
  )
}

export default VideoPlayer;