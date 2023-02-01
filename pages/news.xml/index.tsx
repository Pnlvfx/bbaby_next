import type { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { server, siteUrl } from '../../components/main/config'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${server}/sitemaps?type=news`)
  const news: NewsProps[] = await response.json()

  const fields: ISitemapField[] = news.map((news) => ({
    loc: `${siteUrl}${news.permalink}`,
    priority: 1,
    lastmod: new Date(news.createdAt).toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
