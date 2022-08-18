import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";

const Governance: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance`} key='canonical' />
      </Head>
        <Layout>
          <GovernanceCtrl>
            <GovernanceMainMenù />
          </GovernanceCtrl>
        </Layout>
    </>
  )
}

export default Governance;

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
