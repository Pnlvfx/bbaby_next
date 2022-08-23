import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/post/Feed'
import Layout from '../components/main/Layout'
import { siteUrl } from '../components/main/config'

type BestPg = {
  posts: PostProps
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
       <Layout>
        <Feed posts={posts} />
      </Layout>
    </>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
  const sessionUrl = `${server}/user`
  const postUrl = `${server}/posts?limit=15&skip=0`
  const headers = context?.req?.headers?.cookie
    ? { cookie: context.req.headers.cookie }
    : undefined

  const response = await fetch(sessionUrl, {
    method: 'get',
    headers,
  })
  const session = await response.json()

  const res = await fetch(postUrl, {
    method: 'get',
    headers,
  })
  const posts = await res.json();

  return {
    props: {
      session,
      posts,
    },
  }
}