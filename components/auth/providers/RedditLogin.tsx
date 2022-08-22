import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { redditAPIurl } from "../../../lib/url";
import { TimeMsgContext, TimeMsgContextProps } from "../../main/TimeMsgContext";

const RedditLogin = (userInfo:UserProps) => {
    const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
    const redditAccount = userInfo.hasExternalAccount ? userInfo.externalAccounts?.find((provider) => provider.provider === 'reddit') : undefined
    const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID
    const uri = process.env.NEXT_PUBLIC_HOSTNAME + '/settings'    //reddit
    const router = useRouter()

    const redditLogin = () => {
        window.open(`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=bbabystyle&redirect_uri=${uri}&duration=permanent&scope=*`,'_self')
    }

    const redditLogout = async () => {
        try {
            const res = await fetch(redditAPIurl.logout, {
                method: 'get',
                credentials: 'include',
            })
            if (res.ok) {
                router.reload();
            } else {

            }
        } catch (err:any) {
            alert(err)
        }
    }

    const getCredentials = async (code:string) => {
        try {
            const res = await fetch(redditAPIurl.login(code) ,{
                method: 'get',
                credentials: 'include'
            })
            if (res.ok) {
                const redirect = window.location.href = '/settings'
            } else {
                setMessage({value: 'Something went wrong!', status: 'error'})
            }
        } catch (err) {
            setMessage({value: 'Something went wrong!', status: 'error'})
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        const {code} = router.query;
        if (!code) return;
        getCredentials(code.toString())
    },[router])

    return (
        <div className="mt-7">
            {!redditAccount && (
                <>
                <div>
                    <p>Connect to Reddit</p>
                    <h2 className="text-[11px] text-reddit_text-darker font-normal pt-[2px]">Connect a Reddit account to enable the choiche to post your content on Reddit. We will never share to Reddit without your permission</h2>
                </div>
                <div className="self-center mt-4">
                    <button onClick={() => {
                        redditLogin()
                    }} className='rounded-full px-4 py-[7px] text-sm font-bold bg-reddit_orange flex ml-auto' >
                    Connect to Reddit
                    </button>
                </div>
                </>
            )}
            {redditAccount && (
                <>
                <div className="flex">
                    <div>
                        <p>Connected to Reddit</p>
                        <h2 className="text-[11px] text-reddit_text-darker font-normal pt-[2px]">You can now choose to see your reddit feed from bbabystyle user-page</h2>
                    </div>
                    <div className="self-center ml-auto">
                        <div className="rounded-full px-4 py-[7px] text-xs ml-auto">
                            <p className="text-reddit_text-darker">@{redditAccount?.username}</p>
                            <button id="logout" title="logout" onClick={() => {
                                redditLogout()
                            }} >
                                <p className="self-center text-center text-reddit_orange mt-2">(disconnect)</p>
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
        )
    }

export default RedditLogin;