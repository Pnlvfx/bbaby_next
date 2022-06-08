import axios from "axios";
import { NextPageContext } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";

function Username() {
  return (
   <div>
     <Head>
     <title>Bbabystyle - user profile page </title>
     </Head>
     <Layout>

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
    }
  }
}