/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://www.bbabystyle.com";

module.exports = {
    siteUrl,
    priority: 1,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            //`${siteUrl}/server-sitemap.xml`,
            `${siteUrl}/server-sitemap-index.xml`
        ],
    },
    exclude: ["/governance","/server-sitemap.xml","/server-sitemap-index.xml","/settings/*","/login/*","/settings"] //user is temp
}