import axios from 'axios';
import { NextPageContext } from 'next';
import Head from 'next/head';

function modqueue() {
  return (
    <div>
      <Head>
        <title>Bbabystyle - community admin page </title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <h1>Admin here(soon)</h1>
    </div>
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