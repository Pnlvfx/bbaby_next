import { useState } from 'react'
import { buttonClass } from '../utils/buttons/Button'
import Image from 'next/image'
import { LOGO } from '../main/config'

function ResetYourPassword() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const resetPassword = async () => {}

  return (
    <div>
      <Image src={LOGO} alt="Logo" width={40} height={40} className="rounded-full" />
      <p className="font-bold">Reset your password</p>
      <div className="w-[600px] pr-48 pt-1">
        <p>
          Tell us the username and email address associated with your Bbabystyle account, and we&apos;ll send you an email with a link to reset your
          password.
        </p>
      </div>
      <div className="pt-4">
        <label>
          <span className="text-sm text-reddit_text-darker">Username:</span>
          <input type="text" className={`inputClass mb-3 w-80 p-2`} value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        {/* {status.err && showErrMsg(status.err)} */}
        <label>
          <span className="text-sm text-reddit_text-darker">E-mail:</span>
          <input type="email" className={`inputClass mb-3 w-80 p-2`} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <button
          className={`mb-3 w-48 py-2 ${buttonClass()}`}
          onClick={() => {
            resetPassword()
          }}
        >
          <p>Reset Password</p>
        </button>
      </div>
      <button className="text-xs font-bold text-reddit_blue">FORGOT USERNAME?</button>
      <div>
        <p className="pt-4 text-sm">Don&apos;t have an email or need assistance loggin in? Get help.</p>
      </div>
      <div className="flex pt-4 pb-24">
        {/* <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('login')}>LOG IN</button>
                <div className='pl-1'>-</div>
                <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('register')}>SIGN UP</button> */}
      </div>
    </div>
  )
}

export default ResetYourPassword
