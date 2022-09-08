import Head from 'next/head';
import {useContext, useEffect} from 'react';
import BoardHeader from '../../components/header/BoardHeader';
import {CommunityContext, CommunityContextProps} from '../../components/community/CommunityContext';
import type { NextPage, NextPageContext } from 'next';
import Feed from '../../components/post/Feed';
import { useRouter } from 'next/router';
import { getSession, ssrHeaders } from '../../components/API/ssrAPI';

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
        <script
            id="Adsense-id"
            async
            onError={(e) => {console.log("Adsense failed to load", e)}}
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7203519143982992"
            crossOrigin="anonymous"
        />
      </Head>
        {!router.query?.postId && <BoardHeader />}
        <Feed community={community} posts={posts} />
    </>
  )
}

export default CommunityPage;

export const getServerSideProps = async(context: NextPageContext) => {
  const {community} = context.query;
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const postUrl = `${server}/posts?community=${community}&limit=15&skip=0`;
  let session = null;
  let posts = [];
  try {
    session = await getSession(context);
    const res = await fetch(postUrl, {
      method: 'get',
      headers : ssrHeaders(context),
    })
    if (res.ok) {
      posts = await res.json();
    }
  } catch (err) {
    
  }

  //context.res?.setHeader('set-cookie', 'session_tracker=sdnguigndfuigdfnguifdgndfgiudfgnfiugdf')

  return {
    props: {
      session,
      community,
      posts,
    },
  }
}
