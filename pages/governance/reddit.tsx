import { GetServerSideProps } from 'next'
import Head from 'next/head'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù'
import Layout from '../../components/main/Layout'

const RedditPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page - Reddit</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href={`${hostname}/governance/reddit`}
          key="canonical"
        />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default RedditPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const headers = context?.req?.headers?.cookie
    ? { cookie: context.req.headers.cookie }
    : undefined
  const url = `${server}/user`
  const response = await fetch(url, {
    method: 'get',
    headers,
  })
  const session = await response.json()

  return {
    props: {
      session,
    },
  }
}
