import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getArticle } from '../../../components/API/newsAPI';
import { getSession } from '../../../components/API/ssrAPI';
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl';
import { NewsContextProvider } from '../../../components/governance/news/NewsContext';
import NewsPage from '../../../components/governance/news/NewsPage';
import { siteUrl } from '../../../components/main/config';

interface NewsIdProps {
  description: string[]
}

const NewsPagee: NextPage<NewsIdProps> = ({ description }) => {
  const router = useRouter()
  return (
    <div>
        <Head>
          <title>Bbabystyle - authority-onlypage</title>
          <meta name='robots' content='noindex' />
          <link rel='canonical' href={`${siteUrl}/governance`} key='canonical' />
        </Head>
        <GovernanceCtrl>
            {router && router.query.imageUrl && router.query.title && (
              <NewsContextProvider 
                originalTitle={router.query.title?.toString()} 
                originalDescription={description}
                originalImage={router.query.imageUrl?.toString()} 
              >
                <NewsPage />
              </NewsContextProvider>
            )}
        </GovernanceCtrl>
    </div>
  )
}

export default NewsPagee;

export const getServerSideProps = async (context: NextPageContext) => {
  const {link, imageUrl} = context.query;
  let session = null;
  let description = null;
  try {
    if (!link) throw new Error('Missing link parameter!')
    if (!imageUrl) throw new Error('Missing imageUrl parameters!')
    session = await getSession(context);
    description = await getArticle(link.toString(), imageUrl.toString(), context)
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      session,
      description
    },
  }
}