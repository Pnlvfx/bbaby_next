import axios from 'axios'
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useContext } from 'react';
import {AuthModalContext, AuthModalContextProps} from './AuthModalContext';

type GoogleProps = {
  setLoading: Dispatch<SetStateAction<boolean>>
}

function Google({setLoading}:GoogleProps) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const router = useRouter()
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;

  const responseGoogle = async(response: CredentialResponse) => {
      try {
        setLoading(true)
        const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY
        const url = `https://extreme-ip-lookup.com/json?key=${IP_API_KEY}`
        const res1 = await fetch(url, {
          method: 'get',
        })
        const userIpInfo = await res1.json();
        const {country,countryCode,city,region,lat,lon} = await userIpInfo
        const res2 = await axios.post(server+'/google_login', {tokenId: response.credential, data: {country,countryCode,city,region,lat,lon}}, {withCredentials:true})
        localStorage.setItem('isLogged', 'true')
        modalContext.setShow('hidden')
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