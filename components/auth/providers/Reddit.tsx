import { useRouter } from "next/router"
import { useEffect } from "react"

const Reddit = () => {

    const router = useRouter()
    const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID
    const uri = process.env.NEXT_PUBLIC_HOSTNAME + '/login/callback'    //reddit
    return (
        <button onClick={() => {
            router.push(`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=bbabystyle&redirect_uri=${uri}&duration=permanent&scope=identity,submit,save,vote`)
        }}>
            Login with Reddit
        </button>
        )
    }

export default Reddit;