import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { useEffect } from 'react';
import { useContext } from 'react';
import CommentPage from '../../../../components/comments/CommentPage'
import { CommunityContext, CommunityContextProps } from '../../../../components/community/CommunityContext';
import Layout from '../../../../components/main/Layout';
import Errorpage404 from '../../../404';

interface PostIdPageProps {
  post: PostProps
  error: boolean
}

const IdPage: NextPage<PostIdPageProps> = ({post,error}) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
    const {title} = post
    const description = post.body
    const url = `${hostname}/b/${post.community}/comments/${post._id}`
    const card = 'summary_large_image';
    const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;

    useEffect(() => {
      getCommunity(post.community)
    },[post.community])

    if (error) {
      return <Errorpage404 />
    }

  return (
    <div>
       <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key='ogtitle' />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta name="description" content={description}  />
        <meta property="og:description" content={description} key='ogdesc'/>
        {post.mediaInfo?.isImage && <meta property="og:image" content={post?.mediaInfo?.image} key='ogimage' />}
        {post.mediaInfo?.isVideo && <meta property="og:image" content={post?.mediaInfo?.video.url.replace('mp4', 'jpg')} key='ogimage' />}
        <meta property="og:url" content={url} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content={card} key='twcard'/>
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Layout>
        <CommentPage post={post}/>
      </Layout>
    </div>
  )
}

export default IdPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {id} = context.query
  const headers = context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined;
  const sessionUrl = `${server}/user`
  const postUrl = `${server}/posts/${id}`

  const response = await fetch(sessionUrl, {
    method: "get",
    headers,
  })
  
  const session = await response.json();

  const res = await fetch(postUrl, {
    method: 'get',
    headers
  });

  const post = await res.json();
  const error = res.ok ? false : true;
  console.log(post)

  return {
    props: {
      session,
      error,
      post
    }
  }
}







