import type { NextPage, NextPageContext } from "next";
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
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <Twitter />
      </GovernanceCtrl>
    </>
  )
}

export default TwitterPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}