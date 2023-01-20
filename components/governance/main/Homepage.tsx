import YoutubeLogin from '../youtube/YoutubeLogin'

const Homepage = () => {
  return (
    <div className="mx-auto flex min-h-[100vh] w-full max-w-[780px] items-center justify-center bg-reddit_dark-brighter">
      <div className="grid-col-1 grid w-full items-center justify-center">
        <YoutubeLogin />
      </div>
    </div>
  )
}

export default Homepage
