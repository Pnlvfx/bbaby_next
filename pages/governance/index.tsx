import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Layout from "../../components/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";

const Governance: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance`} key='canonical' />
      </Head>
      <div className="w-full h-[1000px]">
        <Layout>
          <GovernanceCtrl/>
          <GovernanceMainMenù />
        </Layout>
      </div>
    </div>
  )
}

export default Governance;

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
    }
  }
}
