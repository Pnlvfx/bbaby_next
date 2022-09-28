import type { NextPage, NextPageContext } from 'next';
import UserSettings from '../../components/user_settings/UserSettings'
import Account from '../../components/user_settings/Account'
import Head from 'next/head';
import UserSecurity from '../../components/utils/security/UserSecurity';
import { getSession } from '../../components/API/ssrAPI';
import { useSession } from '../../components/auth/UserContext';

const AccountPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {session} = useSession();
  const title = 'Bbabystyle Settings'
  const description = `${session?.user?.username}`
  const url = `${hostname}/settings/account`;
  const imagePreview = session?.user?.avatar;
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
      <UserSecurity>
      <main className='bg-reddit_dark-brighter flex justify-center'>
        <div className='w-[60%] max-w-[1350px]'>
          <UserSettings />
          <Account />
        </div>
      </main>
      </UserSecurity>
    </div>
  )
}

export default AccountPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}