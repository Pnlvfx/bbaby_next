import type { GetServerSideProps, NextPage } from 'next'
import { useContext, useEffect } from 'react';
import CommentPage from '../../../../components/comments/CommentPage'
import { CommunityContext, CommunityContextProps } from '../../../../components/community/CommunityContext';
import CEO from '../../../../components/main/CEO';
import { siteUrl } from '../../../../components/main/config';
import Errorpage404 from '../../../404';

interface PostIdPageProps {
  post: PostProps
  error: boolean
}

const IdPage: NextPage<PostIdPageProps> = ({post, error}) => {
    const {title} = post
    const description = post.body
    const url = `${siteUrl}/b/${post.community}/comments/${post._id}`
    const twitter_card = 'summary_large_image';
    const type = 'article'
    const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;
    const og_image = post.mediaInfo?.isImage ?
     post.mediaInfo.image : 
     post.mediaInfo?.isVideo ? 
     post.mediaInfo.video.url.replace('mp4', 'jpg') : 
     undefined;
     const og_video = post.mediaInfo?.isVideo ? post.mediaInfo.video.url : undefined
     const og_wdith = post.mediaInfo?.dimension ? post.mediaInfo.dimension[1].toString() : undefined;
     const og_height = post.mediaInfo?.dimension ? post.mediaInfo.dimension[0].toString() : undefined;

    useEffect(() => {
      if (post.community) {
        getCommunity(post.community);
        }
    }, [post])
    
    if (error) {
      return <Errorpage404 />
    }

  return (
    <>
      <CEO 
        title={title}
        url={url}
        description={description}
        twitter_card={twitter_card}
        type={type}
        image={og_image}
        video={og_video}
        width={og_wdith}
        height={og_height}
      />
      <CommentPage post={post}/>
    </>
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
    method: "GET",
    headers,
  })
  
  const session = await response.json();

  const res = await fetch(postUrl, {
    method: 'GET',
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







