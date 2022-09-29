import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { getSession } from '../../components/API/ssrAPI';
import { siteUrl } from '../../components/main/config';
import CookieNotice from '../../components/policies/CookieNotice';
import PoliciesLayout from '../../components/policies/PoliciesLayout';

const CookiesPage: NextPage = () => {
  const url = `${siteUrl}/policies/cookies`
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

