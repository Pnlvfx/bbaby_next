import axios from 'axios'
import React, { useEffect } from 'react'

const UserPage = (props: any) => {
  const {username}: any = props
  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(`${server}/user/posts?author=${username}`).then(response => {
      console.log(response)
    })
  },[])

  return (
    <div>U</div>
  )
}

export default UserPage;