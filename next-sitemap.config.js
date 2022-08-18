/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_HOSTNAME

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
