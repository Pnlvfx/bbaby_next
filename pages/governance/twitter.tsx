import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Layout from "../../components/Layout";
import Twitter from "../../components/governance/twitter/Twitter";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";

const TwitterPage: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - twitter</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance/twitter`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <Twitter />
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default TwitterPage;

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
