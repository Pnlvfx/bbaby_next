import UserSettings from '../../components/auth/usersettings/UserSettings'
import Account from '../../components/auth/usersettings/each/Account'
import axios from 'axios';
import { NextPageContext } from 'next';
import Layout from '../../components/Layout';

function index() {
  return (
    <Layout>
      <div className='bg-reddit_dark-brighter'>
        <div className='pl-10'>
          <UserSettings />
          <Account />
        </div>
    </div>
    </Layout>
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