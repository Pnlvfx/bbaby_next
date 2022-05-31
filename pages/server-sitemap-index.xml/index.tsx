// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemapIndex(ctx, [
    'https://www.bbabystyle.com/server-sitemap.xml',
  ])
}

export default function SitemapIndex() {}