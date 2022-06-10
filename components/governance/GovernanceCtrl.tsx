import axios from "axios"
import { useContext } from "react"
import UserContext from '../auth/UserContext'
import Feed from "../post/Feed"
import Button from "../utils/Button"

const GovernanceCtrl = () => {
const provider = useContext(UserContext)
  const {session}:any = provider
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const createImage = async() => {
    const res = await axios.get(`${server}/admin/create-image`, {withCredentials:true})
  }

  const createVideo = async() => {
    const res = await axios.get(`${server}/admin/create-video`, {withCredentials:true})
  }

  return (
    <>
    {!session && (
          <div>
            <h1>You cannot access this page as you are not an admin</h1>
          </div>
        )}
          <div>
            {session?.user?.role === 0 && (
            <div className="text-center pt-8">
              <h1>You cannot access this page as you are not an admin</h1>
            </div>
            )}
            {session?.user?.role === 1 && (
              <>
                <div className='mx-auto my-auto self-center text-center pt-8'>
                  <Button onClick={() => {
                    createImage()
                  }} className='py-2 px-4'>Create image from post
                  </Button>
                </div>
                <div className='mx-auto my-auto self-center text-center pt-8'>
                  <Button onClick={() => {
                    createVideo()
                  }} className='py-2 px-4'>Create video from images
                  </Button>
                </div>
                <Feed />
              </>
            )}
          </div>
    </>
  )
}

export default GovernanceCtrl