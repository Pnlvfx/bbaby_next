import VideoPlayer from '../../components/utils/video/VideoPlayer';

const Testvideo = () => {
  return (
    <>
      <VideoPlayer 
      src='http://localhost:8080/videos'
      poster=''
      height={599}
      width={599}
      />
    </>
  )
}

export default Testvideo;