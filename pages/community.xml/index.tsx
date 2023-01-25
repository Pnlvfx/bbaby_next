import type { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { server, siteUrl } from '../../components/main/config'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${server}/sitemaps?type=community`)
  const communities: CommunityProps[] = await response.json()

  const fields: ISitemapField[] = communities.map((community) => ({
    loc: `${siteUrl}/b/${community.name.toLowerCase()}`,
    priority: 1,
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
