import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import GovernanceCtrl from "../../components/governance/GovernanceCtrl"
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù"
import GovNewsFeed from "../../components/governance/news/GovNewsFeed"
import Layout from "../../components/main/Layout"

const govNewsPage:NextPage = () => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
        <Head>
        <title>Bbabystyle - authority page</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance/news`} key='canonical' />
      </Head>
        <Layout>
          <GovernanceCtrl>
            <GovernanceMainMenù />
            <GovNewsFeed />
          </GovernanceCtrl>
        </Layout>
    </div>
  )
}

export default govNewsPage;

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