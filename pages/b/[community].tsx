import Head from 'next/head';
import {useContext, useEffect} from 'react'
import Layout from '../../components/Layout'
import BoardHeader from '../../components/header/BoardHeader'
import {CommunityContext, CommunityContextProps} from '../../components/community/CommunityContext'
import axios from 'axios';
import {NextPage, NextPageContext } from 'next';
import Feed from '../../components/post/Feed';
import { useRouter } from 'next/router';

type CommunityPg = {
  community: string,
  posts: PostProps
}

const CommunityPage: NextPage<CommunityPg> = ({community,posts}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'
  const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;
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
        <meta name="description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." />
        <meta property="og:description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={`${hostname}/b/${community}`} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
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

export const getServerSideProps = async(context: NextPageContext) => {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const {query} = context
  const {community} = query

  const res = await axios({
    method: 'get',
    url: `${server}/posts?community=${community}&limit=15&skip=0`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
  })
  const posts = res.data

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = response.data
  return {
    props: {
      session: session,
      community,
      posts
    }
  }
}
