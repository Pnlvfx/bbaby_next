import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { login } from "../API/oauthAPI";
import { useSession } from "./UserContext";
import * as gtag from '../../lib/gtag';
import Link from "next/link";
import Google from "./providers/google/Google";
import AuthInput from "./auth-input/AuthInput";
import { Spinner } from "../utils/Button";
import { useAuthModal } from "./modal/AuthModalContext";

const LoginForm = () => {
  
    const [username, setUsername] = useState('');
    const [usernameIsvalid, setUsernameIsValid] = useState<boolean | null>(null);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {session, refreshSession} = useSession();
    const router = useRouter();
    const authModal = useAuthModal();
  
    useEffect(() => {
      if (session?.user) {
        router.push('/');
      }
    }, [session]);
  
    const doLogin = async () => {
      try {
        setLoading(true);
        await login(username, password);
        localStorage.setItem('isLogged', 'true');
        //gtag.loginAnalytics();
        //await refreshSession();
        if (top?.window.location.href) {
          top.window.location.href = '/'
        } else {
          window.location.href = '/'
        }
        //authModal.setShow('hidden');
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    const validatePass = (input: HTMLInputElement['value']) => {
      setPassword(input);
    }

    const validateUsername = (input: HTMLInputElement['value']) => {
      setUsername(input);
    }
    
  return (
    <div className="block text-black bg-white">
      <main className="block">
        <div className="items-center justify-center min-h-[100vh] w-[100vw] flex flex-col box-border">
          <div className="flex box-border">
            <div className="max-w-[280px] p-0 self-center w-full box-border">
              <div className="mx-auto max-w-[280px] w-[280px] box-border block">
                <h1 className="mt-6 text-xl">Log In</h1>
              </div>
              <p className=" mt-2 mx-auto text-xs">
                By continuing, you agree are setting up a Bbabystyle account and agree to our{' '}
                <Link
                  target={'_blank'} 
                  href={'/policies/user-agreement'}
                  className='text-reddit_blue'
                >
                  User Agreement{' '}
                </Link>
                and{' '}
                <Link 
                  target={'_blank'} 
                  href={'/policies/privacy-policy'}
                  className='text-reddit_blue'
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <form 
                method="post" 
                action="/login"
                className="m-auto max-w-[280px] w-[280px] box-border block"
              >
                <div className="mt-8 mb-[18px] box-border">
                  <div className="box-border">
                    <div className="min-w-[280px] block h-[44px] my-2 relative max-w-[400px] w-[280px] box-border">
                      <Google />
                    </div>
                  </div>
                  <div className="mt-[20px] mb-6 items-center flex justify-between">
                    <span className="box-border w-[40%]"/>
                    <span className="box-border w-[40%] font-bold text-sm">OR</span>
                    <span className="box-border w-[40%]"/>
                  </div>
                </div>
                <AuthInput id="loginUsername" type="text" name="username" value={username} validate={validateUsername} error={''} isValid={usernameIsvalid} autoComplete={'on'} />
                <AuthInput id="loginPassword" type="password" name="password" value={password} validate={validatePass} error={''} isValid={null} autoComplete={'on'} />
                <div className="text-[12px] leading-4 mt-4">
                  Forget your{' '}
                  <Link href={''} className='text-[#0079d3] font-bold leading-6 underline'>
                    username
                  </Link>
                  {' '}or{' '}
                  <Link href={''} className='text-[#0079d3] font-bold leading-6 underline'>
                    password
                  </Link>
                  {' '} ?
                </div>
                <fieldset className="mt-4 max-w-[280px] relative">
                  <button 
                    className="font-bold text-[14px] leading-4 bg-reddit_blue h-[40px] px-4 mt-2 w-full rounded-full" 
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      doLogin();
                    }}
                  >
                    {loading ? <Spinner /> : 'Log In'}
                  </button>
                </fieldset>
                <div className="text-[12px] leading-4 mt-4 box-border block">
                  New to Bbaby?{' '}
                  <Link 
                    href={'/account/register'} 
                    className='text-[#0079d3] font-bold leading-6 underline'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (router.pathname.match('register') || router.pathname.match('login')) {
                        router.push('/account/register');
                      } else {
                        authModal.setShow('register');
                      }
                    }}
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginForm;