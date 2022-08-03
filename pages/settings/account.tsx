import UserSettings from '../../components/auth/usersettings/UserSettings'
import Account from '../../components/auth/usersettings/each/Account'
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';
import Layout from '../../components/main/Layout';
import Head from 'next/head';
import UserSecurity from '../../components/utils/security/UserSecurity';
import { useContext } from 'react';
import UserContext from '../../components/auth/UserContext';

const AccountPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {session} = useContext(UserContext) as SessionProps;
  const title = 'Bbabystyle Settings'
  const description = `${session?.user.username}`
  const url = `${hostname}/settings/account`
  const imagePreview = `${hostname}/imagePreview.png`;
  
  return (
    <div>
      <Head>
      <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={title}
          key="ogtitle"
        />
        <meta name="description" content={description} />
        <meta
          property="og:description"
          content={description}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={imagePreview}
          key="ogimage"
        />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="profile" key="ogtype" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image:alt"
          content=""
        />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Layout>
        <UserSecurity>
        <main className='bg-reddit_dark-brighter flex justify-center'>
          <div className='w-[60%] max-w-[1350px]'>
            <UserSettings />
            <Account />
          </div>
        </main>
        </UserSecurity>
      </Layout>
    </div>
  )
}

export default AccountPage;

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