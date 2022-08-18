import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/main/Layout";
import Twitter from "../../components/governance/twitter/Twitter";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";

const TwitterPage: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - twitter</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/twitter`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <Twitter />
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default TwitterPage;

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