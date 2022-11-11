import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { checkEmail } from "../../API/oauthAPI";
import AuthInput from "../auth-input/AuthInput";
import { useAuthModal } from "../modal/AuthModalContext";
import Google from "../providers/google/Google";
import { useSession } from "../UserContext";

type Register1 = {
    setFase2: Dispatch<SetStateAction<boolean>>
    email: string
    setEmail: Dispatch<SetStateAction<string>>
}

const Register1 = ({ setFase2, email, setEmail }: Register1) => {
    const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);
    const [emailError, setEmailError] = useState('');
    const {session} = useSession();
    const router = useRouter();
    const authModal = useAuthModal();
  
    useEffect(() => {
      if (session?.user) {
        router.push('/');
      }
    }, [session]);

      const validateEmail = async (input: HTMLInputElement['value']) => {
        setEmail(input);
        const isvalid = await checkEmail(input);
        setEmailIsValid(isvalid.status);
        setEmailError(isvalid.data);
      }

  return (
    <div className="items-center justify-center min-h-[100vh] w-[100vw] flex flex-col box-border">
        <div className="flex box-border">
        <div className="max-w-[280px] p-0 self-center w-full box-border">
            <div className="mx-auto max-w-[280px] w-[280px] box-border block">
            <h1 className="mt-6 text-xl">Sign Up</h1>
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
            <AuthInput id="regEmail" type="text" name="email" value={email} validate={validateEmail} isValid={emailIsValid} error={emailError} autoComplete={'off'} />
            <fieldset className="mt-4 max-w-[280px] relative">
                <button
                  className={`font-bold text-[14px] leading-4 bg-reddit_blue h-[40px] px-4 mt-2 w-full rounded-full ${!emailIsValid && 'cursor-not-allowed opacity-20 pointer-events-none'}`} 
                  type="submit"
                  disabled={!emailIsValid ? true : false}
                  onClick={(e) => {
                      e.preventDefault();
                      setFase2(true);
                  }}
                >
                Continue
                </button>
            </fieldset>
            <div className="text-[12px] leading-4 mt-4 box-border block">
                Already a Bbaby user?{' '}
                <Link 
                    href={'/account/login'} 
                    className='text-[#0079d3] font-bold leading-6 underline'
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (router.pathname.match('register') || router.pathname.match('login')) {
                        router.push('/account/login');
                        } else {
                        authModal.setShow('login');
                        }
                    }}
                >
                Log In
                </Link>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Register1