import Head from 'next/head';
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout';
import PrivacyPolicies from '../../components/utils/policies/PrivacyPolicies'

function privacyPolicy() {
  return (
      <div>
        <Head>
        <title>Bbabystyle Privacy Policy</title>
        <link rel="icon" href="/favicon.ico"/>
        </Head>
        <PoliciesLayout>
          <PrivacyPolicies />
        </PoliciesLayout>
      </div>
  )
}

export default privacyPolicy;