import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import UserPage from '../../components/user/UserPage'

const Username:NextPage = (props) => {
  const {username}: any = props
  
  return (
   <div>
     <Head>
      <title>Bbabystyle - user profile page </title>
     </Head>
     <Layout>
      <UserPage username={username} />
     </Layout>
   </div>
  )
}

export default Username;

export async function getServerSideProps(context: NextPageContext) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response =  await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    })
    const session = await response.data

  return {
    props: {
      session: session,
      username: context.query.username
    }
  }
}