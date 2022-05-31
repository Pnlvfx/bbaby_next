import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import {isMobile} from 'react-device-detect'
import axios from 'axios'
import { useRouter } from 'next/router'
import CommentModal from '../components/comments/CommentModal'
import { useEffect,useState } from 'react'
import Feed from '../components/post/Feed'
import Layout from '../components/Layout'


const Home: NextPage = (props) => {

  const [postOpen, setPostOpen] = useState(false)

  //metatags
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'

  let router = useRouter()
  let commentId = null

  if(router.query && router.query.commentId) {
    router.pathname = '/';
    commentId = router.query.commentId;  
  }

  useEffect(() => {
    setPostOpen(true);
  }, [commentId]);

  useEffect(() => {
    commentId= null
  },[postOpen]);
  
  return (
    <div className="">
      <Head>
        <title>Bbabystyle - Dive into anything </title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Bbabystyle - Dive into anything" key='ogtitle' />
        <meta name="description" content="Bbabystyle - Free speech is here" />
        <meta property="og:description" content="Bbabystyle - Free speech is here" key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={hostname} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={hostname} key='canonical' />
      </Head>
       <Layout>
        <Feed comments={props}/>
          {commentId && !isMobile && (
          <CommentModal id={commentId}
          open={postOpen}
          onClickOut={() => {
            setPostOpen(false)
          }}/>
          )} 
      </Layout>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  
  const res = await axios.get(`${server}/comments?limit=10&skip=0`);
  const comments = res.data

  //const getNumberOfPost = await axios.get(`${server}/comments/count`);

  const response =  await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data

  return {
    props: {
      session: session,
      allComments : comments
    }
  }
}
