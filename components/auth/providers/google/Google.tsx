
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useContext } from 'react';
import {AuthModalContext, AuthModalContextProps} from '../../modal/AuthModalContext';
import { TimeMsgContext, TimeMsgContextProps } from '../../../main/TimeMsgContext';
import GoogleLogin from './GoogleLogin';
import { CredentialResponse } from '../../../../@types/google';
import { googleLogin } from './hooks/googleLogin';

type GoogleProps = {
  setLoading: Dispatch<SetStateAction<boolean>>
}

const Google = ({setLoading}:GoogleProps) => {
  const router = useRouter()
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;

  const responseGoogle = async (response: CredentialResponse) => {
    setLoading(true)
    googleLogin(response, modalContext, router, message)
    setLoading(false);
  }

  return (
    <GoogleLogin
      onSuccess={response => responseGoogle(response)}
      onError={() => message.setMessage({value: 'Something went wrong', status: 'error'})}
      width={'200'}
      size={'large'}
      type={'standard'}
      theme={'filled_black'}
      locale={'en'}
    />
  )
}

export default Google;