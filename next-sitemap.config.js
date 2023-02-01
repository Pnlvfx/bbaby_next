/** @type {import('next-sitemap').IConfig} */

const siteUrl = 'https://www.bbabystyle.com'

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/login', '/governance', '/governance/*', '/submit', '/activation/*', '/b/*/submit'],
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`, `${siteUrl}/news-sitemap.xml`, `${siteUrl}/community.xml`],
  },
  exclude: [
    '/governance',
    '/governance/*',
    '/account/*',
    '/server-sitemap.xml',
    '/news.xml',
    '/community.xml',
    '/settings',
    '/settings/*',
    '/login',
    '/policies/*',
    '/best',
    '/bbaby/leaderboard',
    '/submit',
    '/search',
  ],
}
