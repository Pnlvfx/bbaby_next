
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {AuthModalContext, AuthModalContextProps} from '../../modal/AuthModalContext';
import { TimeMsgContext, TimeMsgContextProps } from '../../../main/TimeMsgContext';
import GoogleLogin from './GoogleLogin';
import { CredentialResponse } from '../../../../@types/google';
import { googleLogin } from './hooks/googleLogin';

const Google = () => {
  const router = useRouter()
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;

  const responseGoogle = async (response: CredentialResponse) => {
    googleLogin(response, modalContext, router, message)
  }

  return (
    <GoogleLogin
      onSuccess={response => responseGoogle(response)}
      onError={() => message.setMessage({value: 'Something went wrong', status: 'error'})}
      width={'280'}
      type={'standard'}
      theme={'filled_blue'}
      locale={'en'}
    />
  )
}

export default Google;