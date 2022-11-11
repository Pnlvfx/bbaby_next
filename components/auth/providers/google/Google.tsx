
import {useAuthModal} from '../../modal/AuthModalContext';
import { useMessage } from '../../../main/TimeMsgContext';
import GoogleLogin from './GoogleLogin';
import { CredentialResponse } from '../../../../@types/google';
import { googleLogin } from './hooks/googleLogin';
import { googleLoginAnalytics } from '../../../../lib/gtag';
import { catchErrorWithMessage } from '../../../API/common';

const Google = () => {
  const modalContext = useAuthModal();
  const message = useMessage();

  const responseGoogle = async (response: CredentialResponse) => {
    try {
      await googleLogin(response);
      localStorage.setItem('isLogged', 'true');
      modalContext.setShow('hidden');
      //googleLoginAnalytics();
      if (top?.window.location.href) {
        top.window.location.href = '/'
      } else {
        window.location.href = '/'
      }
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <GoogleLogin
      onSuccess={response => responseGoogle(response)}
      onError={() => message.setMessage({value: 'Something went wrong', status: 'error'})}
      width={'280'}
      type={'standard'}
      theme={'outline'}
      locale={'en'}
    />
  )
}

export default Google;