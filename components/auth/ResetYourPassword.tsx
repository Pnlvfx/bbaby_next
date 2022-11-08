import {useState} from 'react';
import { buttonClass } from '../utils/Button';
import Image from 'next/image';
import { userAPIurl } from '../../lib/url';
import { LOGO, postRequestHeaders } from '../main/config';

function ResetYourPassword() {
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');

    const resetPassword = async () => {
        const res = await fetch(userAPIurl.reset_password, {
            method: 'post',
            headers: postRequestHeaders,
            body: JSON.stringify('')
        })
        const bo = await res.json();
    }

  return (
    <div>
        <Image
            src={LOGO} 
            alt="Logo" 
            width={40} 
            height={40}
            className='rounded-full'
        />
        <p className='font-bold'>Reset your password</p>
        <div className='w-[600px] pr-48 pt-1'>
            <p>Tell us the username and email address associated with your Bbabystyle account, and we&apos;ll send you an email with a link to reset your password.</p>
        </div>
            <div className='pt-4'>
                <label>
                    <span className='text-reddit_text-darker text-sm'>Username:</span>
                    <input type='text' className={`mb-3 w-80 p-2 inputClass`} value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                {/* {status.err && showErrMsg(status.err)} */}
                <label>
                    <span className='text-reddit_text-darker text-sm'>E-mail:</span>
                    <input type='email' className={`p-2 mb-3 w-80 inputClass`} value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <button 
                className={`w-48 py-2 mb-3 ${buttonClass()}`} 
                onClick={() => {
                    resetPassword();
                }}>
                    <p>Reset Password</p>
                </button>
            </div>
                <button className="text-reddit_blue font-bold text-xs">FORGOT USERNAME?</button>
                <div>
                    <p className='text-sm pt-4'>Don&apos;t have an email or need assistance loggin in? Get help.</p>
                </div>
                <div className='pt-4 flex pb-24'>
                {/* <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('login')}>LOG IN</button>
                <div className='pl-1'>-</div>
                <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('register')}>SIGN UP</button> */}
                </div>
    </div>
  )
}

export default ResetYourPassword;