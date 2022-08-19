import axios from 'axios'
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useContext } from 'react';
import {AuthModalContext, AuthModalContextProps} from './AuthModalContext';
import { getUserIP } from './APIauth';
import { googleLoginAnalytics } from '../../lib/gtag';
import { google_loginUrl } from '../../lib/url';

type GoogleProps = {
  setLoading: Dispatch<SetStateAction<boolean>>
}

const Google = ({setLoading}:GoogleProps) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const router = useRouter()
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const responseGoogle = async (response: CredentialResponse) => {
      try {
        setLoading(true)
        const userIpInfo = await getUserIP();
        const {country,countryCode,city,region,lat,lon} = await userIpInfo
        const res2 = await axios({
          method:'post',
          url: google_loginUrl,
          data: {tokenId: response.credential, data: {country,countryCode,city,region,lat,lon}},
          withCredentials:true
        })
        localStorage.setItem('isLogged', 'true')
        modalContext.setShow('hidden')
        googleLoginAnalytics()
        if(res2.data.msg === "newUser") {
          localStorage.setItem('firstLogin', 'true')
          router.reload()
        } else {
          router.reload()
        }
      } catch (err) {
        console.log(err)
      }
  }

  if (!GOOGLE_CLIENT_ID) return null;

  return (
      <div className='w-[200px] mb-6 overflow-hidden'>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
                onSuccess={response => {responseGoogle(response)}}
                onError={() => {responseGoogle}}
                width={'200px'}
                size={'large'}
                type={'standard'}
                theme={'filled_black'}
                locale={'en'}
          />
      </GoogleOAuthProvider>
    </div>
  )
}

export default Google;