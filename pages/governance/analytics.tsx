import axios from 'axios'
import { NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl'
import Layout from '../../components/Layout'

const AnalyticsPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance/analytics`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default AnalyticsPage;

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