import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../../components/governance/GovernanceMainMenù'
import LinkPreview, { LinkPreviewLoader } from '../../../components/utils/LinkPreview'
import { useState } from 'react'
import { siteUrl } from '../../../components/main/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { catchErrorWithMessage } from '../../../components/API/common'
import { useMessage } from '../../../components/main/TimeMsgContext'
import govnewsapi from '../../../components/API/governance/govnewsapi'

type GovNewsPageProps = {
  news: ExternalNews[]
}

const GovNewsPage: NextPage<GovNewsPageProps> = ({ news }) => {
  const [BBCnews, setBBCnews] = useState<ExternalNews[]>(news)
  const url = `${siteUrl}/governance/news`
  const message = useMessage()

  const getMore = async () => {
    try {
      const news = await govnewsapi.getArticles(10, BBCnews.length)
      setBBCnews((oldNews) => [...oldNews, ...news])
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={url} key="canonical" />
      </Head>
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <InfiniteScroll
          className="xl:space-x-auto mt-5 w-full xl:grid xl:grid-cols-3"
          dataLength={BBCnews.length}
          next={getMore}
          hasMore={true}
          loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
            <LinkPreviewLoader key={idx} />
          ))}
          endMessage={<p>No more news.</p>}
        >
          {BBCnews.map((news, key) => (
            <LinkPreview key={key} title={news.title} url={news.permalink} description={news.description} image={news.image} date={news.date} />
          ))}
        </InfiniteScroll>
      </GovernanceCtrl>
    </>
  )
}

export default GovNewsPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const news = await govnewsapi.getArticles(16, 0, context)
    return {
      props: {
        session,
        news,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we will fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
