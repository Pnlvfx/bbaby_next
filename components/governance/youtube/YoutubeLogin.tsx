import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { youtubeAccessTokenUrl, youtubeLoginUrl } from "../../../lib/url";
import { TimeMsgContext, TimeMsgContextProps } from "../../main/TimeMsgContext";
import { buttonClass } from "../../utils/Button";

const YoutubeLogin = () => {
    const router = useRouter()
    const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
    const youtubeLogin = async () => {
        try {
            const res = await fetch(youtubeLoginUrl, {
                method: 'get',
                credentials: 'include'
            })
            if (res.ok) {
                const redirect = await res.json();
                router.push(redirect)
            } else {
                const error = await res.json();
                setMessage({value: error.msg, status: 'error'})
            }
        } catch (err) {
            setMessage({value: 'Something went wrong!', status: 'error'})
        }
    }

    const getAccessToken = async (code: string) => {
        try {
            const body = JSON.stringify({code})
            const res = await fetch(youtubeAccessTokenUrl, {
                method: 'post',
                body,
                credentials: 'include',
            })
            if (res.ok) {
                router.replace('/governance/youtube', undefined, {shallow: true});
            } else {
                const error = await res.json();
                setMessage({value: error.msg, status: 'error'})
            }
        } catch (err) {
            setMessage({value: 'Something went wrong!', status: 'error'});
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        if (!router.query.code) return;
        getAccessToken(router.query.code.toString());
    },[router])

    return (
        <>
        <div className="ml-auto self-center">
            <button type='submit' className={`w-40 h-7 self-center ${buttonClass(true)}`} onClick={(e) => {
                e.preventDefault();
                youtubeLogin();
            }} >
                <p>Youtube Login</p>
            </button>
        </div>
        </>
    )
}

export default YoutubeLogin;