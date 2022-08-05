import { NextPage } from 'next';
import Head from 'next/head';
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout';

const UserAgreementPage:NextPage = () => {
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

export default UserAgreementPage;