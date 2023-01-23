import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import newsapis from '../../components/API/newsapis'
import { getSession } from '../../components/API/ssrAPI'
import CEO from '../../components/main/CEO'
import { siteUrl } from '../../components/main/config'
import PageNotFound from '../../components/main/PageNotFound'
import MyNewsCard from '../../components/mynews/MyNewsCard'
import Donations from '../../components/widget/Donations'
import PolicyWidget from '../../components/widget/PolicyWidget'
import Widget from '../../components/widget/Widget'

interface NewsIdPageProps {
  news?: NewsProps
}

const NewsIdPage: NextPage<NewsIdPageProps> = ({ news }) => {
  const description = news?.description.substring(0, 250) || ''
  const router = useRouter()
  const url = news ? `${siteUrl}${news.permalink}` : `${siteUrl}${router.asPath}`
  const title = news?.title || router.asPath.split('/')[2]

  return (
    <>
      <CEO
        title={title}
        description={description}
        twitter_card="summary_large_image"
        type="article"
        url={url}
        image={news?.mediaInfo.image}
        height={news?.mediaInfo.height.toString()}
        width={news?.mediaInfo.width.toString()}
        index={true}
      />
      <div className="mx-auto box-border flex max-w-full justify-center md:py-5 md:px-6">
        {news ? (
          <div className="w-full lg:w-[640px]">
            <MyNewsCard news={news} isListing={false} />
          </div>
        ) : (
          <PageNotFound />
        )}
        <div className="ml-6 hidden lg:block">
          <Widget />
          <Donations />
          <PolicyWidget />
        </div>
      </div>
    </>
  )
}

export default NewsIdPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    let { permalink } = context.query
    if (!permalink) throw new Error(`Missing title parameters.`)
    const news = await newsapis.getArticle(permalink.toString(), context)
    return {
      props: {
        session,
        news: news as NewsProps,
      },
    }
  } catch (err) {
    const error = `Sorry we couldn't load this news.`
    return {
      props: {
        error,
      },
    }
  }
}
