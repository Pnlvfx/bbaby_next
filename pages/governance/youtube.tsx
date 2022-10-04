import Youtube from '../../components/governance/youtube/Youtube'
import type { NextPage, NextPageContext } from "next";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from 'next/head';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import { YoutubeContextProvider } from '../../components/governance/youtube/YoutubeContext';
import { getOneNews } from '../../components/mynews/APInews';
import { getSession } from '../../components/API/ssrAPI';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - youtube</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/youtube`} key='canonical' />
      </Head>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <YoutubeContextProvider ssrNews={news} >
            <Youtube /> 
          </YoutubeContextProvider>
        </GovernanceCtrl>
    </div>
  )
}

export default Governance;

export const getServerSideProps = async(context: NextPageContext) => {
  try {
    const {newsId} = context.query;
    const session = await getSession(context);
    if (!newsId) throw new Error('Missing required newsId parameter.')
    const res = await getOneNews(newsId.toString(), context);
    const news = await res.json(); //single
    return {
      props: {
        session,
        news,
      },
    }
  } catch (err) {
    const error = () => {
      if (err instanceof Error) {
        return err.message
      } else {
        return `Server is down`
      }
    }
    return {
      props: {
        error: error()
      }
    }
  }
}