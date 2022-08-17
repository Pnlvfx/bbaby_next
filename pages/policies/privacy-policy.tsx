import { NextPage } from 'next';
import Head from 'next/head';
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout';
import PrivacyPolicies from '../../components/utils/policies/PrivacyPolicies';

const PrivacyPolicyPage:NextPage = () => {
  return (
      <div>
        <Head>
        <title>Bbabystyle Privacy Policy</title>
        </Head>
        <PoliciesLayout>
          <PrivacyPolicies />
        </PoliciesLayout>
      </div>
  )
}

export default PrivacyPolicyPage;