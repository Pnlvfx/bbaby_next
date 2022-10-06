import type { NextPage, NextPageContext } from "next";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";
import Homepage from "../../components/governance/main/Homepage";
import { getYoutubeAccessToken } from "../../components/API/governance/youtubeAPI";
import { useContext, useEffect } from "react";
import { TimeMsgContext, TimeMsgContextProps } from "../../components/main/TimeMsgContext";
import { useRouter } from "next/router";
import { getSession } from "../../components/API/ssrAPI";
import { siteUrl } from "../../components/main/config";

interface YoutubeError {
  youtube?: string
}

const Governance: NextPage<YoutubeError> = ({youtube}) => {
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const router = useRouter();

  useEffect(() => {
    if (!youtube) return;
    if (!router.isReady) return;
    setMessage({value: youtube, status: 'success'})
    router.replace('/governance', undefined, {shallow: false});

    return () => {
      youtube = ''
    }
  },[router, youtube])

  return (
    <>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${siteUrl}/governance`} key='canonical' />
      </Head>
          <GovernanceCtrl>
            <GovernanceMainMenù />
            <Homepage />
          </GovernanceCtrl>
    </>
  )
}

export default Governance;

export const getServerSideProps = async (context: NextPageContext) => {
  const {code} = context.query;
  let session = null;
  let youtube = ''
  let error = ''
  try {
    session = await getSession(context);
    
  } catch (error) {
    
  }
  if (code) {
    const res = await getYoutubeAccessToken(code.toString(), context);
    youtube = 'Account connected successfully'
  }

  return {
    props: {
      session,
      youtube
    },
  }
}
