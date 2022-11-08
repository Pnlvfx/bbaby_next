import { useState, useContext, useEffect, FormEvent } from 'react';
import {AuthModalContext, AuthModalContextProps} from './AuthModalContext';
import { buttonClass, Spinner } from '../../utils/Button';
import { showErrMsg } from '../../utils/validation/Notification';
import NewEmailNotif from '../NewEmailNotif';
import ResetYourPassword from '../ResetYourPassword';
import Google from '../providers/google/Google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserPreferencesModal from '../../user/UserPreferencesModal';
import { CloseIcon } from '../../utils/SVG';
import { NextComponentType } from 'next';
import * as gtag from '../../../lib/gtag';
import { loginUrl } from '../../../lib/url';
import { postRequestHeaders } from '../../main/config';
import { register } from '../../API/oauthAPI';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';

export type StatusProps = {
  err?: string
}

const AuthModal: NextComponentType = () => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<StatusProps>({})
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  // IF NEW USER
  const [EmailTo, setEmailTo] = useState('')
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const { show, setShow } = modalContext;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const doRegister = async () => {
    try {
      setLoading(true);
      const data = await register(email, username, password);
      message.setMessage({ value: data?.msg, status: 'success' });
      localStorage.setItem('isLogged', 'true');
      setEmailTo(email);
      setShow('hidden');
      gtag.registerAnalytics();
      router.reload()
    } catch (err) {
      if (err instanceof Error) {
        setStatus({ err: err.message });
      } else {
        setStatus({ err: 'Unknown error' });
      }
      setLoading(false);
    }
  }

  const login = async () => {
    try {
      setLoading(true)
      const body = JSON.stringify({ username, password })
      const res = await fetch(loginUrl, {
        method: 'post',
        body,
        headers: postRequestHeaders,
        credentials: 'include'
      })
      const data = await res.json();
      if (res.ok) {
        message.setMessage({ value: data?.msg, status: 'success' });
        localStorage.setItem('isLogged', 'true')
        gtag.loginAnalytics();
        router.reload()
      } else {
        setStatus({ err: data?.msg})
        setLoading(false)
      }
    } catch (err) {
        setStatus({ err: 'Unknown error'})
        setLoading(false)
    }
  }

  const closeModal = async () => {
    setShow('hidden')
    setEmail('')
    setPassword('')
    setUsername('')
    setStatus({})
    setLoading(false);
  }

  // ONLY AFTER FIRST LOGIN
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      setNewUser(firstLogin)
    }
  }, [])

  return (
    <div>
      <div className='bg-[rgba(0,0,0,.4)] h-full left-0 fixed top-0 w-full z-[110]'>
        <div className='rounded-[12px] h-[640px] w-[400px] left-[50%] overflow-hidden shadow-[1px_7px_20px_2px_rgb(0_0_0/40%)] fixed top-[50%] z-[111' style={{transform: 'translate(-50%, -50%)'}}>
          <iframe src='http://localhost:3000/login' className='w-full h-full' />
        </div>
      </div>
      <>
        {EmailTo && <NewEmailNotif email={EmailTo} />}
        {newUser && <UserPreferencesModal setNewUser={setNewUser} />}
      </>
    </div>
  )
}

export default AuthModal;

