import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import UserContext from '../../components/auth/UserContext'
import Profile from '../../components/auth/usersettings/each/Profile'
import UserSettings from '../../components/auth/usersettings/UserSettings'
import Layout from '../../components/main/Layout'
import UserSecurity from '../../components/utils/security/UserSecurity'

const ProfilePage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {session} = useContext(UserContext) as SessionProps;
  const title = 'Bbabystyle Settings'
  const description = `${session?.user.username}`
  const url = `${hostname}/settings/profile`
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
          <main className="flex bg-reddit_dark-brighter justify-center">
            <div className='w-[60%] max-w-[1350px]'>
              <UserSettings />
              <Profile />
            </div>
          </main>
        </UserSecurity>
      </Layout>
    </div>
  )
}

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const headers = context?.req?.headers?.cookie ? { cookie: context.req.headers.cookie } : undefined;
  const url = `${server}/user`
  const response = await fetch(url, {
    method: 'get',
    headers
  })
  const session = await response.json();

  return {
    props: {
      session,
    },
  }
}
