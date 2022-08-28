import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'
import { getSession } from '../../components/API/ssrAPI';
import CookieNotice from '../../components/policies/CookieNotice';
import PoliciesLayout from '../../components/policies/PoliciesLayout';

const CookiesPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const url = `${hostname}/policies/cookies`
  return (
    <div>
      <Head>
        <title>Bbabystyle Cookies Policy</title>
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <PoliciesLayout>
        <CookieNotice />
      </PoliciesLayout>
    </div>
  )
}

export default CookiesPage;

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

