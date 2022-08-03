import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import axios from 'axios'
import Feed from '../components/post/Feed'
import Layout from '../components/main/Layout'

type HomePg = {
  posts: PostProps
}

const Home: NextPage<HomePg> = ({ posts }) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'
  const title = "Bbabystyle - Free speech"
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={title}
          key="ogtitle"
        />
        <meta name="description" content={description} />
        <meta
          property="og:description"
          content={description}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={hostname + imagePreview}
          key="ogimage"
        />
        <meta property="og:url" content={hostname} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image:alt"
          content="This image contain the logo of this website"
        />
        <link rel="canonical" href={hostname} key="canonical" />
      </Head>
      <Layout>
        <Feed posts={posts} />
      </Layout>
    </>
  )
}

export default Home;


export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const headers = context?.req?.headers?.cookie
    ? { cookie: context.req.headers.cookie }
    : undefined

  const response = await axios({
    method: 'get',
    url: `${server}/user`,
    headers,
  })
  const session = response.data

  const res = await axios({
    method: 'get',
    url: `${server}/posts?limit=15&skip=0`,
    headers,
  })
  const posts = res.data
  return {
    props: {
      session,
      posts,
    },
  }
}
