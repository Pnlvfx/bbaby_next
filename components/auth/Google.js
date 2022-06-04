import axios from 'axios'
import {GoogleLogin} from '@react-oauth/google'
import { useRouter } from 'next/router';

function Google() {

  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const router = useRouter()

  const responseGoogle = async(response) => {
      
      try {
        // const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY
        // const userIpInfo = await axios.get(`http://extreme-ip-lookup.com/json?key=${IP_API_KEY}`)
        // const {country,countryCode,city,region} = await userIpInfo.data

        // data: {country,countryCode,city,region}

        const res = await axios.post(server+'/google_login', {tokenId: response.credential},{withCredentials:true})
        localStorage.setItem('isLogged', true)
        router.reload()
      } catch (err) {
        //console.log(err)
      }
  }

  return (
        <GoogleLogin
            onSuccess={response => {responseGoogle(response)}}
            onError={response => {responseGoogle(response)}}
        />
    
  )
}

export default Google;