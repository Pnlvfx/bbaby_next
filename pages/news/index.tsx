import type { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import newsapis from '../../components/API/newsapis'
import { getSession } from '../../components/API/ssrAPI'
import Skeleton from '../../components/governance/twitter/Skeleton'
import CEO from '../../components/main/CEO'
import { siteUrl } from '../../components/main/config'
import MyNewsCard from '../../components/mynews/MyNewsCard'
import BestPost from '../../components/post/postutils/BestPost'
import Donations from '../../components/widget/Donations'
import PolicyWidget from '../../components/widget/PolicyWidget'
import Widget from '../../components/widget/Widget'

interface MyNewsPageProps {
  ssrNews: NewsProps[]
}

const MyNewsPage: NextPage<MyNewsPageProps> = ({ ssrNews }) => {
  const [news, setNews] = useState(ssrNews)
  const imagePreview = `${siteUrl}/imagePreview.png`
  const title = 'Bbabystyle - News in italiano'
  const description = 'Bbabystyle - News in italiano'
  const url = `${siteUrl}/news`
  const [hasMore, setHasMore] = useState(news.length >= 10 ? true : false)

  const getMoreNews = async () => {
    try {
      const newNews = await newsapis.getArticles(news.length, 10)
      if (newNews.length < 10) {
        setHasMore(false)
      }
      setNews([...news, ...newNews])
    } catch (err) {}
  }

  return (
    <>
      <CEO
        title={title}
        description={description}
        twitter_card="summary"
        type="website"
        url={url}
        image={imagePreview}
        width={'256'}
        height={'256'}
        index={true}
      />
      <div className="mx-auto box-border flex max-w-full justify-center md:py-5 md:px-6">
        <div className="w-full lg:w-[640px]">
          <div className="mb-4">
            <BestPost />
          </div>
          <InfiniteScroll
            dataLength={news?.length || 1}
            next={getMoreNews}
            hasMore={hasMore}
            loader={[1, 2, 3, 4, 5].map((_, idx) => (
              <Skeleton isImage={true} key={idx} />
            ))}
            endMessage={<></>}
          >
            {news?.length >= 1 ? news?.map((news) => <MyNewsCard key={news._id} news={news} isListing={true} />) : <div></div>}
          </InfiniteScroll>
        </div>
        <div className="ml-6 hidden lg:block">
          <Widget />
          <Donations />
          <PolicyWidget />
        </div>
      </div>
    </>
  )
}

export default MyNewsPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const ssrNews = await newsapis.getArticles(0, 10, context)
    return {
      props: {
        session,
        ssrNews,
      },
    }
  } catch (err) {
    const error = ''
    return {
      props: {
        error,
      },
    }
  }
}
