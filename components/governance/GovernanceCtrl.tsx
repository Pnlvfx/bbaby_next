import axios from "axios"
import { useContext, useState } from "react"
import UserContext from '../auth/UserContext'
import LoaderPlaceholder from "../post/LoaderPlaceholder"
import Submit from "../submit/Submit"
import Button from "../utils/Button"
import Tweet from "./twitter/Tweet"

const GovernanceCtrl = () => {
const provider = useContext(UserContext)
  const {session}:any = provider
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const [tweets,setTweets] = useState([])
  const [loading,setLoading] = useState(false)


  /// TRANSLATION
  const [selectedTweet,setSelectedTweet] = useState(null)  //SETTEDD IN TWEETCONTENT:JSX
  const [translatedTweet,setTranslatedTweet] = useState(null)
  //

  const createImage = async() => {
    const res = await axios.get(`${server}/admin/create-image`, {withCredentials:true})
  }

  const createVideo = async() => {
    const res = await axios.get(`${server}/admin/create-video`, {withCredentials:true})
  }

  const getMyListTweets = async() => {
    const anonListId = '1535968733537177604'
    const owner_screen_name = 'anonynewsitaly' 
    setLoading(true)
    const res = await axios.get(`${server}/twitter/selected-tweets?slug=${anonListId}&owner_screen_name=${owner_screen_name}`, {withCredentials:true})
    setTweets(res.data)
    setLoading(false)
  }

  //console.log(selectedTweet)

  return (
    <>
    {!session && (
      <div className="my-auto mx-auto text-center self-center">
        <h1 className="self-center text-sm pt-20 text-reddit_red">You cannot access this page as you are not an admin</h1>
      </div>
    )}
    {session?.user?.role === 0 && (
      <div className="my-auto mx-auto text-center self-center">
        <h1 className="self-center text-sm pt-20 text-reddit_red">You cannot access this page as you are not an admin</h1>
      </div>
    )}
    {session?.user?.role === 1 && (
    <div id="main">
      <div id="2nd_header" className={'w-full bg-reddit_dark-brighter p-1 border-b border-reddit_border z-30'}>
            <div className="flex">
              <div className='mx-2 my-auto text-center'>
                <Button onClick={() => {
                  createImage()
                }} className='py-2 px-4'>Create image from post
                </Button>
              </div>
              <div className='mx-2 my-auto text-center'>
                <Button onClick={() => {
                  createVideo()
                }} className='py-2 px-4'>Create video from images
                </Button>
              </div>
              <div className='mx-2 my-auto text-center'>
                  <Button onClick={() => {
                    getMyListTweets()
                  }} className='py-2 px-4'>See Anon Tweet-list
                  </Button>
              </div>
            </div>
      </div>
        <div id="diplay_tweets" className="flex pt-5 mx-0 lg:mx-10">
          <div className="w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center mr-6 flex-none">
            {!tweets && (
              <div>Nothing for now</div>
            )}
            {loading && (
              <div>
                {tweets.map((tweet: any) => (
                <LoaderPlaceholder key={tweet.id} extraStyles={{height:'20px'}} />
                ))}
              </div>
            )}
            {!loading && tweets && (
              <div className="">
              {tweets.map((tweet: any) => (
                <Tweet key={tweet.id} {...tweet} isListing={true} setTranslatedTweet={setTranslatedTweet}/>
              ))}
              </div>
            )}
          </div>
          <div>
          <div className=" p-2 sm:p-4 block lg:flex self-center">
            <div className="pr-0 md:pr-3 w-full lg:w-[800px]">
              <Submit translatedTweet={translatedTweet} userRole={session.user.role} />
            </div>
        </div>
          </div>
        </div>
    </div>
    )}
    </>
  )
}

export default GovernanceCtrl


