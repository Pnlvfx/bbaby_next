import Youtube from '../../components/governance/youtube/Youtube'
import type { NextPage, NextPageContext } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from 'next/head';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import { YoutubeContextProvider } from '../../components/governance/youtube/YoutubeContext';
import { getOneNews } from '../../components/mynews/APInews';
import { getSession } from '../../components/API/ssrAPI';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { youtubeAuth } from '../../components/API/governance/youtubeAPI';

interface NewsPropsPage {
  news: NewsProps
  auth: boolean
}

const Governance: NextPage<NewsPropsPage> = ({ news, auth }) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (!news) {
      const url = `/news`;
      router.push(url);
    }
  }, [router, news])

  useEffect(() => {
    if (!router.isReady) return;
    if (!auth) {
      const url = `/governance`;
      router.push(url);
    }
  }, [router, auth])

  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - youtube</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/youtube`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <YoutubeContextProvider ssrNews={news} >
            <Youtube /> 
          </YoutubeContextProvider>
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default Governance;

export const getServerSideProps = async(context: NextPageContext) => {
  const {newsId} = context.query;
  let session = null;
  let auth = false;
  let news = null;
  try {
    session = await getSession(context);
    auth = await youtubeAuth(context);
    if (newsId) {
      const res = await getOneNews(newsId.toString(), context);
      news = await res.json(); //single
    }
  } catch (err) {
    
  }
  return {
    props: {
      session,
      auth,
      news,
    },
  }
}