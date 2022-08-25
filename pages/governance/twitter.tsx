import type { NextPage, NextPageContext } from "next";
import Layout from "../../components/main/Layout";
import Twitter from "../../components/governance/twitter/Twitter";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";
import { getSession } from "../../components/API/ssrAPI";
import { siteUrl } from "../../components/main/config";

const TwitterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bbabystyle - authority page - twitter</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${siteUrl}/governance/twitter`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <Twitter />
        </GovernanceCtrl>
      </Layout>
    </>
  )
}

export default TwitterPage;

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
    },
  }
}