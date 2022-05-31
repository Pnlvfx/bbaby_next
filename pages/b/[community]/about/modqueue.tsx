import axios from 'axios';
import { NextPageContext } from 'next';
import React from 'react'

function modqueue() {
  return (
    <div>Admin here(soon)</div>
  )
}

export default modqueue;

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data
  return {
    props: {
      session: session,
    }
  }
}