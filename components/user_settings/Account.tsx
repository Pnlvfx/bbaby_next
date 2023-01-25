import { useEffect, useState } from "react";
import { buttonClass } from "../utils/Button";
import {RiArrowDropDownFill} from 'react-icons/ri'
import TwitterLogin from "../auth/providers/TwitterLogin";
import RedditLogin from "../auth/providers/RedditLogin";
import { NextComponentType } from "next";
import { useMessage } from "../main/TimeMsgContext";
import { catchErrorWithMessage } from "../API/common";
import userapis from "../API/userapis";

const Account: NextComponentType = () => {

  const [userInfo, setUserInfo] = useState<UserProps>({})
  const [loading, setLoading] = useState(true)
  const message = useMessage();

  useEffect(() => {
    const _getUserInfo = async () => {
      try {
        const user_info = await userapis.getUserInfo();
        setUserInfo(user_info);
        setLoading(false);
      } catch (err) {
        catchErrorWithMessage(err, message)
      }
    }
    _getUserInfo();
  }, [])

  return (
      <>
      {loading && (
        <div>loading...</div>
      )}
      {!loading && (
        <div className="font-semibold space-y-6 mt-6 max-w-[800px]">
          <p className='text-[19px]'>Account settings</p>
          <div>
            <p className="text-reddit_text-darker text-[11px]">ACCOUNT PREFERENCES</p>
            <hr className='border-reddit_border mt-1'/>
          </div>
          <div id="change_email_address" className="mt-7 flex items-center">
            <div>
              <p>Email address</p>
              <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">{userInfo.email}</p>
            </div>
            <div className="ml-auto">
              <button className={`py-1 px-[18px] ${buttonClass(true)}`}>Change</button>
            </div>
          </div>
          <div id="change_password" className="mt-7 flex items-center">
            <div className="">
              <p className="">Change password</p>
              <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">Password must be at least 8 characters long</p>
            </div>
            <div className="ml-auto">
              <button className={`py-1 px-[18px] ${buttonClass(true)}`}>Change</button>
            </div>
          </div>
          <div id="gender" className="mt-7 flex items-center">
            <div className="">
              <p className="">Gender</p>
              <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">Bbaby will never share this information and only uses it to improve what content you see.</p>
            </div>
            <div className="ml-auto flex items-center">
              <div className='py-2 text-xs'>SELECT</div>
              <RiArrowDropDownFill className="w-7 h-7 text-reddit_text-darker" />
            </div>
          </div>
          <div id="country" className="mt-7">
            <div className="">
              <p className="">Country</p>
              <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">This is your primary location.</p>
            </div>
            <div className="ml-auto">
              <div className='py-5 text-sm px-[28px]'>{userInfo.country}</div>
            </div>
          </div>
          <div id="separator">
            <p className="text-reddit_text-darker text-[11px] mb-2">CONNECTED ACCOUNTS</p>
            <hr className='mt-1 border-reddit_border'/>
          </div>
          <div id="social_connection" className="pb-[2000px]">
            <TwitterLogin {...userInfo}/>
            <RedditLogin {...userInfo} />
          </div>
        </div>
      )}
      </>
  )
}

export default Account;