/** @type {import('next-sitemap').IConfig} */

const siteUrl = 'https://www.bbabystyle.com'

module.exports = {
  siteUrl,
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
