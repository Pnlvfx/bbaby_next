import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { useEffect } from 'react';
import { useContext } from 'react';
import CommentPage from '../../../../components/comments/CommentPage'
import { CommunityContext, CommunityContextProps } from '../../../../components/community/CommunityContext';
import CEO from '../../../../components/main/CEO';
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
    const twitter_card = 'summary_large_image';
    const type = 'article'
    const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;
    const og_image = post.mediaInfo?.isImage ? post.mediaInfo.image : post.mediaInfo?.isVideo ? post.mediaInfo.video.url.replace('mp4', 'jpg') : undefined

    useEffect(() => {
      getCommunity(post.community)
    },[post.community])

    if (error) {
      return <Errorpage404 />
    }

  return (
    <div>
      <CEO 
        title={title}
        url={url}
        description={description}
        twitter_card={twitter_card}
        type={type}
        image={og_image}
      />
      <Layout>
        <CommentPage post={post}/>
      </Layout>
    </div>
  )
}

export default IdPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
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

  return {
    props: {
      session,
      error,
      post
    }
  }
}







