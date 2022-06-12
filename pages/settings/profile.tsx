import axios from 'axios';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Profile from '../../components/auth/usersettings/each/Profile'
import UserSettings from '../../components/auth/usersettings/UserSettings'
import Layout from '../../components/Layout';

function profile() {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
      <Head>
        <title>Bbabystyle - Settings </title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={hostname+'/settings/profile'} key='canonical' />
      </Head>
      <Layout>
        <div className='bg-reddit_dark-brighter flex'>
          <div className='w-full md:w-11/12 lg:w-9/12 xl:w-7/12 2xl:w-[850px] self-center mr-0 md:mr-auto ml-0 xl:ml-auto overflow-hidden'>
            <UserSettings />
            <Profile />
          </div>
          <div className='w-0 xl:w-[480px]'/>
        </div>
      </Layout>
    </div>
  )
}

export default profile;

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