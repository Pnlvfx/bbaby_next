import axios from 'axios'
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useContext } from 'react';
import {AuthModalContext, AuthModalContextProps} from './AuthModalContext';
import { getUserIP } from './APIauth';
import { googleLoginAnalytics } from '../../lib/gtag';

type GoogleProps = {
  setLoading: Dispatch<SetStateAction<boolean>>
}

const Google = ({setLoading}:GoogleProps) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const router = useRouter()
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;

  const responseGoogle = async (response: CredentialResponse) => {
      try {
        setLoading(true)
        const userIpInfo = await getUserIP();
        const {country,countryCode,city,region,lat,lon} = await userIpInfo
        const url = `${server}/google_login`;
        const res2 = await axios({
          method:'post',
          url,
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

  return (
      <div className='w-[200px]'>
        <GoogleOAuthProvider clientId='527300585899-mh0q9kh2fpijep43k37oriuafsl8m9hi.apps.googleusercontent.com'>
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