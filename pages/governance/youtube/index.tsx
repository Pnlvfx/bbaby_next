import Youtube from '../../../components/governance/youtube/Youtube'
import type { NextPage, NextPageContext } from 'next'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import Head from 'next/head'
import GovernanceMainMenù from '../../../components/governance/GovernanceMainMenù'
import { getOneNews } from '../../../components/mynews/APInews'
import { getSession } from '../../../components/API/ssrAPI'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { siteUrl } from '../../../components/main/config'

interface NewsPropsPage {
  news: NewsProps
}

const Governance: NextPage<NewsPropsPage> = ({ news }) => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    if (!news) {
      const url = `/news`
      router.push(url)
    }
  }, [router, news])

  return (
    <div className="h-[1000px] w-full">
      <Head>
        <title>Bbabystyle - authority page - youtube</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${siteUrl}/governance/youtube`} key="canonical" />
      </Head>
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <Youtube news={news} />
      </GovernanceCtrl>
    </div>
  )
}

export default Governance

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const { permalink } = context.query
    if (!permalink) throw new Error('Missing required permalink parameter.')
    const news = await getOneNews(permalink.toString(), context)
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
        error: error(),
      },
    }
  }
}
