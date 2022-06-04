import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Callback = () => {
      let router = useRouter()
      const [loading,setLoading] = useState(false)

      useEffect(() => {
        if(!router.isReady) return;
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const {query} = router
        setLoading(true)
        axios.get(`${server}/reddit_login?code=${query.code}`, {withCredentials:true})
        setLoading(false)
    }, [router])


  return (
    <div>
    {loading && (
      <div>loading...</div>
    )}
    {!loading && (
      <div>Login with Reddit successfully</div>
    )}
    </div>
  )
}

export default Callback