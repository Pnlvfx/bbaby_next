/** @type {import('next-sitemap').IConfig} */

const sitemapBaseUrl = 'https://www.bbabystyle.com'

module.exports = {
  siteUrl: sitemapBaseUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/community.xml`,
    ],
  },
  exclude: [
    '/governance',
    '/governance/*',
    '/server-sitemap.xml',
    '/community.xml',
    '/settings/*',
    '/login',
    '/login/*',
    '/settings',
    '/policies/*',
  ],
}
