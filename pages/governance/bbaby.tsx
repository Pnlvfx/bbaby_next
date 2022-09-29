import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { getSession } from '../../components/API/ssrAPI'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù'
import Homepage from '../../components/governance/main/Homepage'
import { siteUrl } from '../../components/main/config'

const AuthorityPage: NextPage = () => {
  
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${siteUrl}/governance/bbaby`} key='canonical' />
      </Head>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <Homepage />
        </GovernanceCtrl>
    </div>
  )
}

export default AuthorityPage;

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