import Youtube from '../../components/governance/youtube/Youtube'
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from 'next/head';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import { YoutubeContextProvider } from '../../components/governance/youtube/YoutubeContext';

const Governance: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - youtube</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance/youtube`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <YoutubeContextProvider>
            <Youtube /> 
          </YoutubeContextProvider>
        </GovernanceCtrl>
      </Layout>
    </div>
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