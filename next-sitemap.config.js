/** @type {import('next-sitemap').IConfig} */

const siteUrl = 'https://www.bbabystyle.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/login', '/governance', '/governance/*', '/submit', '/activation/*']
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ],
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
    '/settings',
    '/policies/*',
    '/best',
    '/bbaby/leaderboard',
    '/submit'
  ],
}
