import Head from 'next/head';
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout';

function userAgreement() {
  return (
    <div>
      <Head>
        <title>Bbabystyle User Agreement</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <PoliciesLayout>

      </PoliciesLayout>
    </div>
  )
}

export default userAgreement;