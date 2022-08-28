import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'
import { getSession } from '../../components/API/ssrAPI'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù'
import Homepage from '../../components/governance/main/Homepage'

const AuthorityPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/bbaby`} key='canonical' />
      </Head>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <Homepage />
        </GovernanceCtrl>
    </div>
  )
}

export default AuthorityPage;

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