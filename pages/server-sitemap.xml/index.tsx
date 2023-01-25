import type { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { server, siteUrl } from '../../components/main/config'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${server}/sitemaps`)
  const posts: PostProps[] = await response.json()

  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `${siteUrl}/b/${post.community.toLowerCase()}/comments/${post._id}`,
    priority: 1,
    lastmod: new Date(post.createdAt).toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
