import UserSettings from '../../components/auth/usersettings/UserSettings'
import Account from '../../components/auth/usersettings/each/Account'
import { NextPageContext } from 'next';
import axios from 'axios';
import Layout from '../../components/Layout';
import Head from 'next/head';
import UserSecurity from '../../components/utils/security/UserSecurity';

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
        <UserSecurity>
        <div className='bg-reddit_dark-brighter flex'>
          <div className='w-full md:w-11/12 lg:w-9/12 xl:w-7/12 2xl:w-[850px] self-center mr-0 md:mr-auto ml-0 xl:ml-auto overflow-hidden'>
            <UserSettings />
            <Account />
          </div>
          <div className='w-0 xl:w-[480px]'/>
        </div>
        </UserSecurity>
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
    const session = response.data
  return {
    props: {
      session: session,
    }
  }
}