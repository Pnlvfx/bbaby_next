import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { getSession } from '../../components/API/ssrAPI';
import { siteUrl } from '../../components/main/config';
import PoliciesLayout from '../../components/policies/PoliciesLayout';
import PrivacyPolicies from '../../components/policies/PrivacyPolicies';

const PrivacyPolicyPage:NextPage = () => {
  const url = `${siteUrl}/policies/privacy-policy`
  return (
      <div>
        <Head>
          <title>Bbabystyle Privacy Policy</title>
          <link rel='canonical' href={url} key='canonical' />
        </Head>
        <PoliciesLayout>
          <PrivacyPolicies />
        </PoliciesLayout>
      </div>
  )
}

export default PrivacyPolicyPage;

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

