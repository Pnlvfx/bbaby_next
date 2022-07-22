import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import Feed from "../../components/post/Feed";

const Username:NextPage = (props) => {
  const {author}: any = props
  
  return (
   <div>
     <Head>
      <title>Bbabystyle - user profile page </title>
     </Head>
     <Layout>
      <Feed author={author} />
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
    const session = response.data

  return {
    props: {
      session: session,
      author: context.query.username
    }
  }
}