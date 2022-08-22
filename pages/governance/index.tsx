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
    if (!youtube) return
    if (!router.isReady) return
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
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req?.headers.host?.replace('3000', '4000')}`;
  const headers = context?.req?.headers?.cookie ? { cookie: context.req.headers.cookie } : undefined;
  const url = `${server}/user`
  const response = await fetch(url, {
    method: 'get',
    headers
  })
  const session = await response.json();

  const {code} = context.query;
  let error = ''
  let youtube = ''
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
