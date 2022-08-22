import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import Layout from "../../components/main/Layout";
import Twitter from "../../components/governance/twitter/Twitter";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";
import { getSession } from "../../components/API/ssrAPI";

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