import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../../utils/Button";

function Account() {

  const [userInfo,setUserInfo] = useState<any>(null)
  const [loading,setLoading] = useState<any>(true)
  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(`${server}/user/private-info`, {withCredentials:true})
      .then(response => {
        setUserInfo(response.data)
        setLoading(false)
      })
  }, [])
  
  const email = userInfo?.email
  

  return (
      <>
      {loading && (
        <div>loading...</div>
      )}
      {!loading && (
        <div className="px-5 font-semibold">
          <h1 className='py-4 text-[19px]'>Account settings</h1>
          <h2 className="text-reddit_text-darker text-[11px] mb-2">ACCOUNT PREFERENCES</h2>
          <hr className='p-2 mx-2 border-reddit_border w-1/2'/>
          <div id="change_email_address" className="mt-5 flex">
            <div className="flex-none">
              <h1 className="">Email address</h1>
              <h2 className="text-[13px] text-reddit_text-darker font-normal pt-[2px]">{email}</h2>
            </div>
            <div className="ml-auto self-center mr-0 md:mr-24">
              <Button outline='true' className='py-1 px-[18px]'>Change</Button>
            </div>
        </div>
        <div id="change_password" className="mt-7 flex">
          <div className="flex-none">
            <h1 className="">Change password</h1>
            <h2 className="text-[13px] text-reddit_text-darker font-normal pt-[2px]">Password must be at least 8 characters long</h2>
          </div>
          <div className="self-center ml-auto mr-0 md:mr-24">
            <Button outline='true' className='py-1 px-[18px]'>Change</Button>
          </div>
        </div>
        <div id="gender" className="mt-7 flex">
          <div className="flex-none">
            <h1 className="">Gender</h1>
            <h2 className="text-[13px] text-reddit_text-darker font-normal pt-[2px]">Bbaby will never share this information and only uses it to improve what content you see</h2>
          </div>
          <div className="self-center ml-auto mr-0 md:mr-24">
            <Button outline='true' className='py-1 px-[18px]'>Change</Button>
          </div>
        </div>
        </div>
      )}
      </>
  )
}

export default Account;