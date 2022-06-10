import Input from '../utils/Input'
import {useState,useContext, SetStateAction} from 'react'
import Button from '../utils/Button';
import AuthModalContext from './AuthModalContext';
import Image from 'next/image';
import Logo from '../../public/logo.png'

function ResetYourPassword() {

    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const modalContext = useContext(AuthModalContext);
    const {setShow}: any = modalContext

  return (
    <div className=''>
        <div className='rounded-full'>
            <Image src={Logo} alt="" width={'40px'} height={'40px'}/>
        </div>
        <h1 className='font-bold'>Reset your password</h1>
        <div className='w-[600px] pr-48 pt-1'>
            <h1>Tell us the username and email address associated with your Bbabystyle account, and we&apos;ll send you an email with a link to reset your password.</h1>
        </div>
            <div className='pt-4'>
                <label>
                    <span className='text-reddit_text-darker text-sm'>Username:</span>
                    <Input type='text' className='mb-3 w-80 p-2' value={username} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}/>
                </label>
                {/* {status.err && showErrMsg(status.err)} */}
                <label>
                    <span className='text-reddit_text-darker text-sm'>E-mail:</span>
                    <Input type='email' className=' p-2 mb-3 w-80' value={email} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <Button className='w-48 py-2 mb-3' style={{borderRadius:'.3rem'}} onClick={() => null}>
                    Reset Password
                </Button>
            </div>
                <button className="text-blue-400 text-sm">FORGOT USERNAME?</button>
                <div>
                    <h1 className='text-sm pt-4'>Don&apos;t have an email or need assistance loggin in? Get help.</h1>
                </div>
                <div className='pt-4 flex pb-24'>
                <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('login')}>LOG IN</button>
                <div className='pl-1'>-</div>
                <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('register')}>SIGN UP</button>
                </div>
    </div>
  )
}

export default ResetYourPassword;