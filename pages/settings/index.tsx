import UserSettings from '../../components/auth/usersettings/UserSettings'
import Account from '../../components/auth/usersettings/each/Account'
import axios from 'axios';
import { NextPageContext } from 'next';
import Layout from '../../components/Layout';
import Head from 'next/head';

function index() {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
      <Head>
        <title>Bbabystyle - Settings </title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={hostname+'/settings'} key='canonical' />
      </Head>
      <Layout>
        <div className='bg-reddit_dark-brighter'>
          <div className='w-full lg:w-6/12 xl:w-7/12 2xl:w-[850px] self-center mx-auto overflow-hidden'>
            <UserSettings />
            <Account />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default index;

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