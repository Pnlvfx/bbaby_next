import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { getSession } from '../../components/API/ssrAPI';
import PoliciesLayout from '../../components/policies/PoliciesLayout';
import UserAgreement from '../../components/policies/UserAgreement';

const UserAgreementPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const url = `${hostname}/policies/user-agreement`;
  return (
    <div>
      <Head>
        <title>Bbabystyle User Agreement</title>
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <PoliciesLayout>
        <UserAgreement />
      </PoliciesLayout>
    </div>
  )
}

export default UserAgreementPage;

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
