import type { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { siteUrl } from "../../components/main/config";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const response = await fetch(`${server}/sitemaps`);
    const posts: PostProps[] = await response.json();

    const fields : ISitemapField[] = posts.map(post => ({
        loc: `${siteUrl}/b/${post.community.toLowerCase()}/comments/${post._id}`,
        priority: 1,
        lastmod: new Date(post.createdAt).toISOString()
}));

    return getServerSideSitemap(ctx, fields)
}

export default function Site() {}