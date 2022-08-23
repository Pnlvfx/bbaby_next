import type { NextPage, NextPageContext } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from "next/head";
import GovernanceMainMenù from "../../components/governance/GovernanceMainMenù";
import Homepage from "../../components/governance/main/Homepage";
import { getYoutubeAccessToken } from "../../components/API/governance/youtubeAPI";
import { useContext, useEffect } from "react";
import { TimeMsgContext, TimeMsgContextProps } from "../../components/main/TimeMsgContext";
import { useRouter } from "next/router";
import { getSession } from "../../components/API/ssrAPI";

interface YoutubeError {
  error?: string
  youtube?: string
}

const Governance: NextPage<YoutubeError> = ({error, youtube}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return
    if (error) {
      setMessage({value: error, status: 'error'});
      router.replace('/governance', undefined, {shallow: false});
    }

    return () => {
      error = ''
    }
  }, [router, error])

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
        <link rel='canonical' href={`${hostname}/governance`} key='canonical' />
      </Head>
        <Layout>
          <GovernanceCtrl>
            <GovernanceMainMenù />
            <Homepage />
          </GovernanceCtrl>
        </Layout>
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
    if (res.ok) {
      youtube = 'Account connected successfully'
    } else {
      const e = res as FetchError;
      error = e.msg
    }
  }

  return {
    props: {
      session,
      error,
      youtube
    },
  }
}
