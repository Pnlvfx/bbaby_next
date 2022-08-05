import Head from 'next/head';
import {useContext, useEffect} from 'react';
import Layout from '../../components/main/Layout';
import BoardHeader from '../../components/header/BoardHeader';
import {CommunityContext, CommunityContextProps} from '../../components/community/CommunityContext';
import {GetServerSideProps, NextPage } from 'next';
import Feed from '../../components/post/Feed';
import { useRouter } from 'next/router';

type CommunityPg = {
  community: string,
  posts: PostProps
}

const CommunityPage: NextPage<CommunityPg> = ({community,posts}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const imagePreview = '/imagePreview.png';
  const {getCommunity,communityInfo} = useContext(CommunityContext) as CommunityContextProps;
  const router = useRouter()

  useEffect(() => {
    getCommunity(community)
  },[community])

  return (
    <div>
      <Head>
        <title>{community}</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content={community} key='ogtitle' />
        <meta name="description" content={communityInfo.description} />
        <meta property="og:description" content={communityInfo.description} key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={`${hostname}/b/${community}`} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="" />
        <link rel='canonical' href={`${hostname}/b/${community}`} key='canonical' />
      </Head>
      <Layout>
          {!router.query?.postId && <BoardHeader community={community}/>}
          <Feed community={community} posts={posts} />
      </Layout>
    </div>
  )
}

export default CommunityPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
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
