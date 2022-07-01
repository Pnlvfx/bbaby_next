/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://www.bbabystyle.com";

module.exports = {
    siteUrl,
    //priority: 1,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/server-sitemap.xml`
        ],
    },
    exclude: ["/governance","/governance/*","/server-sitemap.xml","/server-sitemap-index.xml","/settings/*","/login/*","/settings"] //user is temp
}