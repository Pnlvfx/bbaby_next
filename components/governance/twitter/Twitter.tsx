import axios from "axios"
import {useState } from "react"
import LoaderPlaceholder from "../../post/LoaderPlaceholder"
import Button from "../../utils/Button"
import Tweet from "./Tweet"

const Twitter = () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const [tweets,setTweets] = useState([])
    const [showTweets,setShowTweets] = useState(false)
    const [loading,setLoading] = useState(false)
        /// TRANSLATION
    const [language,setLanguage] = useState('')
    //
    const getMyListTweets = async(listId:string,owner_screen_name:string) => {
        setLoading(true)
        const res = await axios.get(`${server}/twitter/selected-tweets?slug=${listId}&owner_screen_name=${owner_screen_name}`, {withCredentials:true})
        setTweets(res.data)
        setShowTweets(true)
        setLoading(false)
    }
    
    return (
        <div>
            <div className="flex">
                <div className='mx-2 my-auto text-center'>
                    <Button onClick={() => {
                        const listId = '1535968733537177604'
                        const owner_screen_name = 'anonynewsitaly'
                        setLanguage('en')
                        getMyListTweets(listId,owner_screen_name)
                        }} className='py-2 px-4'>English Tweet
                    </Button>
                </div>
                <div className='mx-2 my-auto text-center'>
                    <Button onClick={() => {
                        const listId = '1539278403689492482'
                        const owner_screen_name = 'Bbabystyle'
                        setLanguage('it')
                        getMyListTweets(listId,owner_screen_name)
                        }} className='py-2 px-4'>ita Tweet
                    </Button>
                </div>
            </div>
            <div id="diplay_tweets" className="flex pt-5 mx-0 lg:mx-10">
                <div className="w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center">
                    {loading && (
                        <div>
                            {tweets.map((tweet: any) => (
                                <LoaderPlaceholder key={tweet.id} extraStyles={{height:'200px'}} />
                            ))}
                        </div>
                    )}
                    {!loading && showTweets && (
                        <div>
                        {tweets.map((tweet: any) => (
                            <Tweet key={tweet.id} tweet={tweet} language={language}/>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
    }

    export default Twitter