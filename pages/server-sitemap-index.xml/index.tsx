// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  return getServerSideSitemapIndex(ctx, [
    'https://www.bbabystyle.com/server-sitemap.xml',
  ])
}

export default function SitemapIndex() {}