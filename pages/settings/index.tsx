import UserSettings from '../../components/user_settings/UserSettings'
import Account from '../../components/user_settings/Account'
import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import Layout from '../../components/main/Layout';
import Head from 'next/head';
import UserSecurity from '../../components/utils/security/UserSecurity';
import { useContext } from 'react';
import UserContext from '../../components/auth/UserContext';
import { getSession } from '../../components/API/ssrAPI';

const UserSettingsPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {session} = useContext(UserContext) as SessionProps;
  const title = 'Bbabystyle Settings'
  const description = `${session?.user.username}`
  const url = `${hostname}/settings`;
  const imagePreview = session?.user.avatar;
  const card = 'summary'
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
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

export default UserSettingsPage;

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
    },
  }
}