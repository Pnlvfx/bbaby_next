import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù'
import Homepage from '../../components/governance/main/Homepage'
import Layout from '../../components/main/Layout'

const AuthorityPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/bbaby`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <Homepage />
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default AuthorityPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
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