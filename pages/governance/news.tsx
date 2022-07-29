import axios from "axios"
import { NextPageContext } from "next"
import Head from "next/head"
import GovernanceCtrl from "../../components/governance/GovernanceCtrl"
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù"
import GovNewsFeed from "../../components/governance/news/GovNewsFeed"
import Layout from "../../components/main/Layout"

const govNewsPage = () => {
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