import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { getArticle } from '../../../components/API/newsAPI'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import { NewsContextProvider } from '../../../components/governance/news/NewsContext'
import NewsPage from '../../../components/governance/news/NewsPage'
import { siteUrl } from '../../../components/main/config'

interface NewsIdProps {
  BBCnews: BBCNews
}

const NewsPagee: NextPage<NewsIdProps> = ({ BBCnews }) => {
  return (
    <>
      <Head>
        <title>Bbabystyle - authority-onlypage</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${siteUrl}/governance`} key="canonical" />
      </Head>
      <GovernanceCtrl>
        {BBCnews && (
          <NewsContextProvider originalTitle={BBCnews.title.toString()} originalDescription={BBCnews.description} originalImage={BBCnews.image}>
            <NewsPage />
          </NewsContextProvider>
        )}
      </GovernanceCtrl>
    </>
  )
}

export default NewsPagee

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const perma = context.query.permalink
    if (!perma) throw new Error('Missing title parameter!')
    const permalink = `/governance/news/${perma}`
    const session = await getSession(context)
    const BBCnews = await getArticle(permalink, context)
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
        error,
      },
    }
  }
}
