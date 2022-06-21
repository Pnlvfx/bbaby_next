import Head from 'next/head';
import UserAgreement from '../../components/utils/policies/UserAgreement'

function userAgreement() {
  return (
    <div>
      <Head>
        <title>Bbabystyle User Agreement</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <UserAgreement/>  
    </div>
  )
}

export default userAgreement;