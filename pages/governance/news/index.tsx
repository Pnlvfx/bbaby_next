import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { getBBCLinks } from '../../../components/API/governance/governanceNewsAPI'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../../components/governance/GovernanceMainMenù'
import LinkPreview, {
  LinkPreviewLoader,
} from '../../../components/utils/LinkPreview'
import { useEffect, useState } from 'react'
import { siteUrl } from '../../../components/main/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { catchErrorWithMessage } from '../../../components/API/common'
import { useMessage } from '../../../components/main/TimeMsgContext'

const GovNewsPage: NextPage = () => {
  const [BBCnews, setBBCnews] = useState<ExternalNews[]>([])
  const url = `${siteUrl}/governance/news`
  const message = useMessage()

  useEffect(() => {
    const get = async () => {
      try {
        const news = await getBBCLinks(16, 0)
        setBBCnews(news)
      } catch (err) {
        catchErrorWithMessage(err, message)
      }
    }
    get()
  }, [])

  const getMore = async () => {
    try {
      const news = await getBBCLinks(10, BBCnews.length)
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
            <LinkPreview
              key={key}
              title={news.title}
              url={news.permalink}
              description={news.description}
              image={news.image}
              date={news.date}
            />
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
    return {
      props: {
        session,
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
