import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { getArticle } from '../../../components/API/newsAPI';
import { getSession } from '../../../components/API/ssrAPI';
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl';
import { NewsContextProvider } from '../../../components/governance/news/NewsContext';
import NewsPage from '../../../components/governance/news/NewsPage';
import { siteUrl } from '../../../components/main/config';

interface NewsIdProps {
  BBCnews: any,
}

const NewsPagee: NextPage<NewsIdProps> = ({ BBCnews }) => {
  return (
    <div>
        <Head>
          <title>Bbabystyle - authority-onlypage</title>
          <meta name='robots' content='noindex' />
          <link rel='canonical' href={`${siteUrl}/governance`} key='canonical' />
        </Head>
        <GovernanceCtrl>
            {BBCnews && (
              <NewsContextProvider 
                originalTitle={BBCnews.title.toString()}
                originalDescription={BBCnews.full_description}
                originalImage={BBCnews.image}
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
  try {
    const { title } = context.query;
    if (!title) throw new Error('Missing title parameter!')
    const fixedTitle = title.toString().replaceAll('_', ' ');
    const session = await getSession(context);
    const BBCnews = await getArticle(fixedTitle, context);
    return {
      props: {
        session,
        BBCnews,
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