import UserSettings from '../../components/auth/usersettings/UserSettings'
import Account from '../../components/auth/usersettings/each/Account'
import { NextPageContext } from 'next';
import axios from 'axios';
import Layout from '../../components/Layout';
import Head from 'next/head';

function account() {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
      <Head>
        <title>Bbabystyle - Settings </title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={hostname+'/settings/account'} key='canonical' />
      </Head>
      <Layout>
        <div className='bg-reddit_dark-brighter'>
          <div className='pl-10'>
            <UserSettings />
            <Account />  
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default account;

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