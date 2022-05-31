/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://www.bbabystyle.com";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/server-sitemap.xml`,
            `${siteUrl}/server-sitemap-index.xml`
        ],
    },
    exclude: ["/activation/*","/server-sitemap.xml","/server-sitemap-index.xml","admin/*"]
}