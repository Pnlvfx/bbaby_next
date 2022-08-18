import type { NextPage } from 'next';
import Head from 'next/head';
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout';
import PrivacyPolicies from '../../components/utils/policies/PrivacyPolicies';

const PrivacyPolicyPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const url = `${hostname}/policies/privacy-policy`
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