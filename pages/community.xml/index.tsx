import type { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { siteUrl } from "../../components/main/config";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const response = await fetch(`${server}/sitemaps?type='community'`);
    const communities: CommunityProps[] = await response.json();

    const fields : ISitemapField[] = communities.map(community => ({
        loc: `${siteUrl}/b/${community.name.toLowerCase()}`,
        priority: 1,
        //lastmod: new Date(post.updatedAt).toISOString()
}));

    return getServerSideSitemap(ctx, fields)
}

export default function Site() {}