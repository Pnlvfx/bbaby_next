import { useState } from "react";
import { register } from "../API/oauthAPI";
import { useMessage } from "../main/TimeMsgContext";
import AuthInput from "./auth-input/AuthInput";
import { useAuthModal } from "./modal/AuthModalContext";
import Register1 from "./register/Register1";
import * as gtag from '../../lib/gtag';
import { Spinner } from "../utils/Button";
import Link from "next/link";
import { GoBackIcon } from "../utils/SVG";

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [usernameIsvalid, setUsernameIsValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [fase2, setFase2] = useState(false);
  const message = useMessage();
  const authModal = useAuthModal();

  const validatePass = (input: HTMLInputElement['value']) => {
    setPassword(input);
    setPasswordIsValid(true);
  }

  const validateUsername = (input: HTMLInputElement['value']) => {
    setUsername(input);
    setUsernameIsValid(true);
  }

  const doRegister = async () => {
    try {
      setLoading(true);
      const data = await register(email, username, password);
      message.setMessage({ value: data?.msg, status: 'success' });
      localStorage.setItem('isLogged', 'true');
      //setEmailTo(email);
      authModal.setShow('hidden');
      gtag.registerAnalytics();
      if (top?.window.location.href) {
        top.window.location.href = '/'
      } else {
        window.location.href = '/'
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="block text-black bg-white">
      <main>
        {!fase2 ? (
          <Register1 setFase2={setFase2} email={email} setEmail={setEmail} />
        ) : (
          <div className="flex items-center justify-center min-h-[100vh] w-[100vw]" style={{flexFlow: 'column nowrap'}}>
            <div className="">
              <Link 
                href={'#'} 
                className='block ml-[-8px] p-2 absolute top-6 w-[14px] h-[14px]'
                onClick={(e) => {
                  e.preventDefault();
                  setFase2(false);
                }}
              >
                <GoBackIcon className='w-[14px] h-[14px] text-[#878a8c]' />
              </Link>
              <div className="items-stretch flex-col max-w-[280px]">
                <div className="m-auto max-w-[280px]">
                  <h1 className="text-[18px] leading-[22px] font-semibold">Choose your username</h1>
                  <p className="text-sm">Your username is how other members will see you. This will be used to credit you for things you share on Bbaby. Once you get a name, you can&apos;t change it.</p>
                </div>
                <div className="flex flex-1 m-auto max-w-[280px] justify-between p-6">
                  <div className="w-full flex items-center justify-center">
                    <form autoComplete="new-password">
                      <AuthInput id="regUsername" type="text" name="username" value={username} validate={validateUsername} error={''} isValid={usernameIsvalid} autoComplete={'new-password'} />
                      <AuthInput id="regPassword" type="password" name="password" value={password} validate={validatePass} error={''} isValid={passwordIsValid} autoComplete={'new-password'} />
                    </form>
                  </div>
                </div>
                <fieldset className="my-5 mx-auto max-w-[280px] relative">
                <button
                  className={`font-bold text-[14px] leading-4 bg-reddit_blue h-[40px] px-4 mt-2 w-full rounded-full ${!usernameIsvalid && passwordIsValid && 'cursor-not-allowed opacity-20 pointer-events-none'}`} 
                  type="submit"
                  disabled={!usernameIsvalid && !passwordIsValid ? true : false}
                  onClick={(e) => {
                      e.preventDefault();
                      doRegister();
                  }}
                >
                  {loading ? <Spinner /> : 'Continue'}
                </button>
                </fieldset>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default RegisterForm;