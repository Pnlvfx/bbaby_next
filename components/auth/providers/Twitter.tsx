import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { TwitterLogo } from "../../utils/SVG"


const Twitter = (userInfo:UserProps) => {
    const router = useRouter()
    const twitterAccount = userInfo.hasExternalAccount ? userInfo?.externalAccounts?.find((provider) => provider.provider === 'twitter') : undefined

    const twitterLogin = async() => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const res = await axios({
                method: 'POST',
                url: `${server}/twitter/oauth/request_token`,
                withCredentials:true
            })
            const {oauth_token} = await res.data
            router.push(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`)
        } catch (err) {
            console.error(err)
        }
    }

    const twitterLogout = () => {
        (async () => {
            try {
                const server = process.env.NEXT_PUBLIC_SERVER_URL
                await axios({
                    method: 'POST',
                    url: `${server}/twitter/logout`,
                    withCredentials:true
                })
                router.reload()
            } catch (err) {
                console.error(err)
            }
        })()
    }

    useEffect(() => {
        (async() => {
            const {oauth_token, oauth_verifier} = router.query
            if (oauth_token && oauth_verifier) {
                try {
                    const server = process.env.NEXT_PUBLIC_SERVER_URL
                    await axios({
                        method: 'POST',
                        url: `${server}/twitter/oauth/access_token`,
                        data: {oauth_token, oauth_verifier},
                        withCredentials:true
                    })
                    const {data: {screen_name}} = await axios({
                        method: 'GET',
                        url: `${server}/twitter/user/info`,
                        withCredentials:true
                    });
                    window.location.href = '/settings'
                } catch (err) {
                    console.error(err)
                }
            }
        })()
    },[router.query])

  return (
        <div id="twitter" className="mt-7">
            {!twitterAccount && (
                <>
                <div className="">
                    <h1 className="">Connect to Twitter</h1>
                    <h2 className="text-[11px] text-reddit_text-darker font-normal pt-[2px]">Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter without your permission.</h2>
                </div>
                 <div className="self-center mt-4">
                    <button onClick={() => {
                        twitterLogin()
                    }} className="rounded-full px-4 py-[7px] text-sm font-bold bg-[#1D96E1] flex ml-auto">
                        <TwitterLogo />
                        <h1 className="self-center text-reddit_dark">Connect to Twitter</h1>
                    </button>
                </div>
                </>
            )}
            {twitterAccount && (
                <>
                <div className="flex">
                    <div className="">
                        <h1 className="">Connected to Twitter</h1>
                        <h2 className="text-[11px] text-reddit_text-darker font-normal pt-[2px]">You can now choose to share your posts to Twitter from the new post composer.</h2>
                    </div>
                    <div className="self-center ml-auto">
                        <div className="rounded-full px-4 py-[7px] text-xs ml-auto">
                        <h1 className="text-reddit_text-darker">@{twitterAccount?.username}</h1>
                            <button id="logout" title="logout" onClick={() => {
                                twitterLogout()
                            }}>
                                <h2 className="self-center text-[#47AEF6] mt-2">(disconnect)</h2>
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
  )
}

export default Twitter