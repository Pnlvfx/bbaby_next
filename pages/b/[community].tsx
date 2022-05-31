import {useContext, useEffect} from 'react'
import BoardHeader from '../../components/header/BoardHeader'
import {CommunityContext} from '../../components/community/CommunityContext'
import axios from 'axios';
import PostsListing from '../../components/post/PostsListing'
import Layout from '../../components/Layout'
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';


const communityPage: NextPage = (props) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'


  const {setCommunity}: any = useContext(CommunityContext)

  const {comments,community}: any = props

  useEffect(() => {
    setCommunity(community)
  },[community]);

  return (
    <div>
      <Head>
        <title>{community}</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content={community} key='ogtitle' />
        <meta name="description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." />
        <meta property="og:description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={hostname} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={hostname} key='canonical' />
      </Head>
      <Layout>
        <div className='w-full'>
          <BoardHeader community={community}/>
          <PostsListing comments={comments} community={community}/>
        </div>
      </Layout>
    </div>
  )
}

export default communityPage

export async function getServerSideProps(context: NextPageContext) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const {community} = query
  
  const res = await axios.get(`${server}/comments?community=${community}&limit=10&skip=0`);
  const comments = res.data

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data
  return {
    props: {
      session: session ,
      comments,
      community
    }
  }
}
