import {useState,useEffect} from 'react'
import {showErrMsg,showSuccessMsg} from '../../components/utils/validation/Notification'
import {useRouter} from 'next/router'
import axios from 'axios'
import Head from 'next/head'
import type { NextPage } from 'next'



const ActivationEmail:NextPage = () => {
    const router = useRouter()
    const activation_token = router.query.token
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
    const url = `${hostname}/activation/${activation_token}`
    const [err,setErr] = useState('')
    const [success,setSuccess] = useState('')

    useEffect(() => {
        if(!router.isReady) return;
        if(activation_token){
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            
            const activationEmail = async () => {
                try {
                    const res = await axios.post(server+'/activation', {activation_token} )
                    setSuccess(res.data.msg)
                } catch (err:any) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token,router.isReady])
  return (
    <div>
        <Head>
            <title>Account activation</title>
            <meta name='robots' content='noindex' />
            <link rel='canonical' href={url} key='canonical' />
        </Head>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
    </div>
  )
}

export default ActivationEmail;