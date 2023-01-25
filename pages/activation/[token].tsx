import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { showErrMsg, showSuccessMsg } from '../../components/utils/validation/Notification'
import { useRouter } from 'next/router'
import { server, siteUrl } from '../../components/main/config'

const ActivationEmail: NextPage = () => {
  const router = useRouter()
  const activation_token = router.query.token
  const url = `${siteUrl}/activation/${activation_token}`
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const url = `${server}/activation`
          const body = JSON.stringify({ activation_token })
          const res = await fetch(url, {
            method: 'POST',
            body,
          })
          const data = await res.json()
          if (!res.ok) {
            setErr(data?.msg)
          } else {
            setSuccess(data.msg)
          }
        } catch (err) {
          console.log(err)
        }
      }
      activationEmail()
    }
  }, [activation_token])

  return (
    <div>
      <Head>
        <title>Account activation</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={url} key="canonical" />
      </Head>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  )
}

export default ActivationEmail
