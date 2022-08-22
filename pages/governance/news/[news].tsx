import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getArticle } from '../../../components/API/newsAPI';
import { getSession } from '../../../components/API/ssrAPI';
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl';
import { NewsContextProvider } from '../../../components/governance/news/NewsContext';
import NewsPage from '../../../components/governance/news/NewsPage';
import Layout from '../../../components/main/Layout';
import Errorpage404 from '../../404';
import Errorpage from '../../500';

interface NewsIdProps {
  description: string
}

const NewsPagee:NextPage<NewsIdProps> = ({description}) => {
    const router = useRouter()
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

  return (
    <div>
        <Head>
          <title>Bbabystyle - authority-onlypage</title>
          <meta name='robots' content='noindex' />
          <link rel='canonical' href={`${hostname}/governance`} key='canonical' />
        </Head>
        <Layout>
            <GovernanceCtrl>
                {router && router.query.imageUrl && router.query.title && (
                  <NewsContextProvider>
                    <NewsPage title={router.query.title?.toString()} image={router.query.imageUrl?.toString()} description={description} />
                  </NewsContextProvider>
                )}
            </GovernanceCtrl>
        </Layout>
    </div>
  )
}

export default NewsPagee;

export const getServerSideProps = async (context: NextPageContext) => {
  const {url, imageUrl} = context.query;
  if (!url || !imageUrl) return Errorpage404
  let session = null;
  let description = null;
  try {
    session = await getSession(context);
    description = await getArticle(url.toString(), imageUrl.toString(), context)
  } catch (err) {
    Errorpage
  }

  return {
    props: {
      session,
      description
    },
  }
}