import { NextPage } from 'next';
import Head from 'next/head';
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout';
import UserAgreement from '../../components/utils/policies/UserAgreement';

const UserAgreementPage:NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bbabystyle User Agreement</title>
      </Head>
      <PoliciesLayout>
        <UserAgreement />
      </PoliciesLayout>
    </div>
  )
}

export default UserAgreementPage;