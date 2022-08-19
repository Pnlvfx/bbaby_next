import axios from "axios"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { TimeMsgContext, TimeMsgContextProps } from "../../main/TimeMsgContext";
import { buttonClass } from "../../utils/Button";

const YoutubeLogin = () => {
    const router = useRouter()
    const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
    const youtubeLogin = async () => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL;
            const url = `${server}/governance/youtube/login`
            const res = await fetch(url, {
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

    useEffect(() => {
        if (!router.isReady) return
        if (!router.query.code && !router.query.scope) return
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const data = {code: router.query.code}
        axios.post(`${server}/governance/youtube/access_token`, data, {withCredentials:true}).then(response => {
            router.push('/governance/youtube')
        })
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