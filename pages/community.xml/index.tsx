import type { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME

    const response = await fetch(`${server}/sitemaps?type='community'`);
    const communities:CommunityProps[] = await response.json();

    const fields : ISitemapField[] = communities.map(community => ({
        loc: hostname+`/b/${community.name}`,
        priority: 1,
        //lastmod: new Date(post.updatedAt).toISOString()
}));

    return getServerSideSitemap(ctx, fields)
}

export default function Site() {}