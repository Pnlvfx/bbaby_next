import { useRouter } from 'next/router'
import { buttonClass } from '../../utils/Button'

const YoutubeLogin = () => {
  const router = useRouter()
  const youtubeLogin = async () => {
    const base_url = 'https://accounts.google.com/o/oauth2/v2/auth'
    const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID
    const SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
    const redirectUrl = window.location.href
    const googleAuth = `${base_url}?scope=${SCOPES}&response_type=code&client_id=${YOUTUBE_CLIENT_ID}&redirect_uri=${redirectUrl}&state=bbabystyle`
    router.push(googleAuth)
  }
  return (
    <>
      <div className="ml-auto self-center">
        <button
          type="submit"
          className={`h-7 w-40 self-center ${buttonClass(true)}`}
          onClick={(e) => {
            e.preventDefault()
            youtubeLogin()
          }}
        >
          <p>Youtube Login</p>
        </button>
      </div>
    </>
  )
}

export default YoutubeLogin
