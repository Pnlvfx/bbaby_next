import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head';
import { useEffect } from 'react';
import { useContext } from 'react';
import CommentPage from '../../../../components/comments/CommentPage'
import { CommunityContext } from '../../../../components/community/CommunityContext';
import Layout from '../../../../components/Layout';

const Id: NextPage<Postprops> = ({post}) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const {setCommunity}: any = useContext(CommunityContext)

    useEffect(() => {
      setCommunity(post.community)
    },[])

  return (
    <div>
       <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} key='ogtitle' />
        <meta name="description" content={`${post.body}`}  />
        <meta property="og:description" content={`${post.body}`} key='ogdesc'/>
        <meta property="og:image" content={post.mediaInfo.image} key='ogimage' />
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

export default Id

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const {id} = query
  const res = await axios.get(server+`/posts/${id}`);
  const post = res.data

  //login
  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = response.data

  return {
    props: {
      session: session,
      post: post
    }
  }
}







