import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head';
import { useEffect } from 'react';
import { useContext } from 'react';
import CommentPage from '../../../../components/comments/CommentPage'
import { CommunityContext, CommunityContextProps } from '../../../../components/community/CommunityContext';
import Layout from '../../../../components/main/Layout';

interface PostIdPageProps {
  post: PostProps
}

const IdPage: NextPage<PostIdPageProps> = ({post}) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;

    useEffect(() => {
      getCommunity(post.community)
    },[post.community])

  return (
    <div>
       <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} key='ogtitle' />
        <meta name="description" content={`${post.body}`}  />
        <meta property="og:description" content={`${post.body}`} key='ogdesc'/>
        {post.mediaInfo?.isImage && <meta property="og:image" content={post?.mediaInfo?.image} key='ogimage' />}
        {post.mediaInfo?.isVideo && <meta property="og:image" content={post?.mediaInfo?.video.url.replace('mp4', 'jpg')} key='ogimage' />}
        <meta property="og:url" content={hostname + '/b/' + post.community + '/comments/' + post._id} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary_large_image" key='twcard'/>
        <meta name="twitter:image:alt" content="" />
        <link rel='canonical' href={hostname + '/b/' + post.community + '/comments/' + post._id} key='canonical' />
      </Head>
      <Layout>
        <CommentPage post={post}/>
      </Layout>
    </div>
  )
}

export default IdPage;

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const headers = context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined
  const {id} = query
  //login
  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers,
  })
    const session = response.data

  const res = await axios({
    method: 'get',
    url: server+`/posts/${id}`,
    headers
  });
  const post = res.data

  return {
    props: {
      session,
      post
    }
  }
}







