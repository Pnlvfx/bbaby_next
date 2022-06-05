import axios from 'axios'
import { useState, useContext } from 'react'
import Input from '../utils/Input'
import AuthModalContext from './AuthModalContext';
import Button from '../utils/Button'
import {showErrMsg} from '../utils/validation/Notification'
import NewEmailNotif from './NewEmailNotif'
import ResetYourPassword from './ResetYourPassword'
import Google from './Google'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Reddit from './providers/Reddit'

function AuthModal() {
    const initialState = {
        err: "",
        success: ""
    }

    const router = useRouter()

    const [status,setStatus] = useState(initialState)

    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const [modalType, setModalType] = useState('login');
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const [EmailTo,setEmailTo] = useState('')

    const modalContext = useContext(AuthModalContext);

    const visibleClass = modalContext.show !== false ? 'block' : 'hidden';
    if(modalContext.show && modalContext.show !== modalType) {
        setModalType(modalContext.show);
    }


    const register = async (e) => {
        e.preventDefault();
        const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY
        const userIpInfo = await axios.get(`https://extreme-ip-lookup.com/json?key=${IP_API_KEY}`)
        const {country,countryCode,city,region,lat,lon} = await userIpInfo.data
        
        const data = {email,username,password,country,countryCode,city,region,lat,lon};
        const res = await axios.post(server+'/register', data, {withCredentials:true})
        .then(() => {
            setStatus({err:"", success:"registration completed"})
            localStorage.setItem('isLogged', true)
            setEmailTo(email)
            router.reload()
            })
        .catch(err => {
        err.response.data.msg &&
        setStatus({err:err.response.data.msg, success: ""})
    })
    }

    const login = async() => {
        try {
            const data = {username,password}
            const res = await axios.post(`${server}/login`, data, {withCredentials:true})
            localStorage.setItem('isLogged', true)
            router.reload()
        } catch (err) {
            err.response.data.msg &&
            setStatus({err:err.response.data.msg, success: ""})
        }
    }



  return (
      <>
      <div className={'w-screen h-screen fixed top-0 left-0 z-30 flex '+ visibleClass} style={{backgroundColor:'rgba(0,0,0,.6'}}>
          <div className='flex border border-reddit_dark-brightest bg-reddit_dark-brighter self-center mx-auto rounded-md'>
            <div className='flex'>
              <div className="hidden lg:block">
              <Image src="/authImage.png"
                        alt=""
                        width={'148px'} 
                        height={'640px'}/>
              </div>
              <div className='flex-none mt-20 pl-6'>


                {modalType === 'reset your password' && (
                    <ResetYourPassword setModalType={setModalType} />
                )}

                {modalType === 'login' && (
                  <div className="pr-52">
                      <h1 className='text-2xl mb-2'>Login</h1>
                      <div className="text-sm pb-10">
                          <h1>By continuing, you agree to our 
                        <Link href={'/policies/user-agreement'}>
                          <a target='_blank' className="text-blue-400">User Agreement</a>
                        </Link></h1> 
                        and     <Link href={'/policies/privacy-policy'}>
                                    <a target='_blank' className="text-blue-400">Privacy Policy</a>
                                </Link>
                        </div>
                  </div>
                )}
                {modalType === 'register' && (
                        <div className="pr-96 mr-24">
                            <h1 className='text-2xl mb-2'>Sign Up</h1>
                            <h2 className="text-sm pb-4 w-60">By continuing, you are setting up a Bbabystyle account and agree to our <Link href={'/policies/user-agreement'}>
                                <a target='_blank' className="text-blue-400">User Agreement</a>
                            </Link> and <Link href={'/policies/privacy-policy'}>
                                <a target='_blank' className="text-blue-400">Privacy Policy</a>
                            </Link>. 
                            </h2>
                        </div>
                )}
                    <div id='google_login' className='pb-6'>
                        <Google />
                    </div>
                    {/* <div id='reddit_login' className='pb-6'>
                        <Reddit />
                    </div> */}
                {modalType === 'register' && (
                    <div>
                        
                        <label>
                        <span className='text-reddit_text-darker text-sm'>E-mail:</span>
                        <Input type='email' className=' p-2 mb-3 w-80' value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                    {status.err && showErrMsg(status.err)}
                    <label>
                        <span className='text-reddit_text-darker text-sm'>Username:</span>
                        <Input type='text' className='mb-3 w-80 p-2' value={username} onChange={e => setUsername(e.target.value)}/>
                    </label>
                    <label className="">
                        <span className='text-reddit_text-darker text-sm'>Password:</span>

                        <Input type='password' className='p-2 mb-3 w-80' value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    
                    </div>
                )}
                {modalType === 'login' && (
                    <div>
                    
                    <label>
                        <span className='text-reddit_text-darker text-sm'>Username:</span>
                        <Input type='text' className='mb-3 w-80 p-2' value={username} onChange={e => setUsername(e.target.value)}/>
                    </label>
                    {status.err && showErrMsg(status.err)}
                    <label className="">
                        <span className='text-reddit_text-darker text-sm'>Password:</span>
                        <Input type='password' className='p-2 mb-3 w-80' value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>   
                    </div>
                    )}
                    {modalType === 'login' && (
                        <Button className='w-80 py-2 mb-3' style={{borderRadius:'.3rem'}} onClick={() => login()}>
                            Log In
                        </Button>
                    )}
                    {modalType === 'register' && (
                        <Button className='w-80 py-2 mb-3' style={{borderRadius:'.3rem'}} onClick={e => register(e)}>
                            Sign Up
                        </Button>
                    )}
                    {modalType === 'login' && (
                        <div className="">
                            <h1 className="mb-6 text-sm">Forgot your <button className="text-blue-400">username</button> or <button className="text-blue-400" onClick={() => modalContext.setShow('reset your password')}>password</button> ?</h1>
                        <div className="text-sm mt-3">
                            New to Bbaby? <button className='font-semibold text-blue-500 ml-1 ' onClick={() => modalContext.setShow('register')}>SIGN UP</button>
                        </div>
                        </div>
                    )}
                {modalType === 'register' && (
                    <div className="text-sm mt-3">
                        Already have an account? <button className="text-blue-500 ml-1 font-semibold" onClick={() => modalContext.setShow('login')}>LOG IN</button>
                    </div>
                )}
              </div>
            </div>
                <div id='closeButton' className="text-right w-7 h-7 mr-3 mt-3">
                    <button 
                    className=""
                    onClick={() => {
                        modalContext.setShow(false)
                        setEmail('');
                        setPassword('');
                        setUsername('');
                        setStatus(initialState)
                    }
                        }>
                            <div className='p-1'>
                            <Image src="/closeIcon.svg" alt="" width={'18px'} height={'18px'} style={{filter:'invert(60%)'}} />
                            </div>
                    </button>
                </div>
          </div>
      </div>
      {EmailTo && (
          <NewEmailNotif email={EmailTo}/>
      )}
      </>
  )
}

export default AuthModal;