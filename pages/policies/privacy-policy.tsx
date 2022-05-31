import Head from 'next/head';
import PrivacyPolicies from '../../components/utils/policies/PrivacyPolicies'

function privacyPolicy() {
  return (
      <div>
        <Head>
        <title>Bbabystyle Privacy Policy</title>
        <link rel="icon" href="/favicon.ico"/>
        </Head>
        <PrivacyPolicies />
      </div>
  )
}

export default privacyPolicy;