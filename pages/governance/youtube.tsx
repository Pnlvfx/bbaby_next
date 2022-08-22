import Youtube from '../../components/governance/youtube/Youtube'
import type { NextPage, NextPageContext } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from 'next/head';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import { YoutubeContextProvider } from '../../components/governance/youtube/YoutubeContext';
import { getOneNews } from '../../components/mynews/APInews';
import { getSession } from '../../components/API/ssrAPI';

interface NewsPropsPage {
  news: NewsProps
}

const Governance: NextPage<NewsPropsPage> = ({ news}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

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
  let news = null
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }
  if (newsId) {
    const res = await getOneNews(newsId.toString(), context);
    news = await res.json(); //single
  } else {
    
  }

  return {
    props: {
      session,
      news
    },
  }
}