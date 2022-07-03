import axios from 'axios'
import {CredentialResponse, GoogleLogin} from '@react-oauth/google'
import { useRouter } from 'next/router';
import { SetStateAction, useContext } from 'react';
import AuthModalContext from './AuthModalContext';

type GoogleProps = {
  setLoading: SetStateAction<any>
}

function Google({setLoading}:GoogleProps) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const router = useRouter()
  const modalContext = useContext(AuthModalContext)

  const responseGoogle = async(response: CredentialResponse) => {
      try {
        setLoading(true)
        const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY
        const userIpInfo = await axios.get(`https://extreme-ip-lookup.com/json?key=${IP_API_KEY}`)
        const {country,countryCode,city,region,lat,lon} = await userIpInfo.data
        // data: {country,countryCode,city,region}

        const res = await axios.post(server+'/google_login', {tokenId: response.credential, data: {country,countryCode,city,region,lat,lon}},{withCredentials:true})
        localStorage.setItem('isLogged', 'true')
        modalContext.setShow('false')
        if(res.data.msg === "newUser") {
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
    <GoogleLogin
          onSuccess={response => {responseGoogle(response)}}
          onError={() => {responseGoogle}}
          width={'200px'}
          size={'large'}
          type={'standard'}
          theme={'filled_black'}
          locale={'en'}
    />
    </div>
  )
}

export default Google;