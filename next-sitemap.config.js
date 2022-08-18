/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_HOSTNAME;

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/server-sitemap.xml`
        ],
    },
    exclude: ["/governance","/governance/*","/server-sitemap.xml","/server-sitemap-index.xml","/settings/*","/login/*","/settings"]
}