import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { buttonClass } from "../../utils/Button"

const YoutubeLogin = () => {
    const router = useRouter()
    const youtubeLogin = async() => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const res = await axios.get(`${server}/governance/youtube/login`, {withCredentials:true})
            router.push(res.data)
        } catch (err) {
            console.log(err)
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
                <button type='submit' className={`w-40 h-7 self-center ${buttonClass(true)}`} onClick={() => {
                    youtubeLogin()
                }} >
                    <p>Youtube Login</p>
                </button>
            </div>
        </>
    )
}

export default YoutubeLogin;