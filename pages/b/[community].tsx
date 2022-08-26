import Head from 'next/head';
import {useContext, useEffect} from 'react';
import Layout from '../../components/main/Layout';
import BoardHeader from '../../components/header/BoardHeader';
import {CommunityContext, CommunityContextProps} from '../../components/community/CommunityContext';
import type {GetServerSideProps, NextPage } from 'next';
import Feed from '../../components/post/Feed';
import { useRouter } from 'next/router';

type CommunityPg = {
  community: string,
  posts: PostProps[]
}

const CommunityPage: NextPage<CommunityPg> = ({community,posts}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {getCommunity,communityInfo} = useContext(CommunityContext) as CommunityContextProps;
  const title = community
  const description = communityInfo.description;
  const imagePreview = '/imagePreview.png';
  const url = `${hostname}/b/${community}`
  const card = 'summary'
  const router = useRouter()

  useEffect(() => {
    getCommunity(community)
  },[community])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Layout>
          {!router.query?.postId && <BoardHeader />}
          <Feed community={community} posts={posts} />
      </Layout>
    </>
  )
}

export default CommunityPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
  const {community} = context.query;
  const headers = context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined
  const sessionUrl = `${server}/user`
  const postsUrl = `${server}/posts?community=${community}&limit=15&skip=0`

  const response = await fetch(sessionUrl, {
    method: "get",
    headers
  })

  const session = await response.json();

  const res = await fetch(postsUrl, {
    method: 'get',
    headers
  })
  const posts = await res.json();

  return {
    props: {
      session,
      community,
      posts
    }
  }
}
