import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Feed from '../components/post/Feed'
import { siteUrl } from '../components/main/config'
import { getSession, ssrHeaders } from '../components/API/ssrAPI'

type BestPg = {
  posts: PostProps[]
}

const Home: NextPage<BestPg> = ({posts}) => {
  const title = "Bbabystyle - Free speech";
  const imagePreview = `${siteUrl}/imagePreview.png`;
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.';
  const card = 'summary';
  const url = siteUrl

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Feed posts={posts} />
    </>
  )
}

export default Home;

export const getServerSideProps = async(context : NextPageContext) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const postUrl = `${server}/posts?limit=15&skip=0`;
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
      posts,
    },
  }
}