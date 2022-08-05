import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/main/Layout";
import Feed from "../../components/post/Feed";
import AuthorHeaderPage from "../../components/user/AuthorHeaderPage";

type AuthorPg = {
  author: string,
  posts: PostProps
}

const Username:NextPage<AuthorPg> = ({author,posts}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const title = `${author}`
  const description = `${author}`
  const url = `${hostname}/user/${author}`

  return (
   <div>
     <Head>
      <title>{title} (u/{title}) - Bbabystyle</title>
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
          content={hostname}
          key="ogimage"
        />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="profile" key="ogtype" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image:alt"
          content=""
        />
        <link rel="canonical" href={url} key="canonical" />
     </Head>
     <Layout>
      <AuthorHeaderPage />
      <Feed author={author} posts={posts} />
     </Layout>
   </div>
  )
}

export default Username;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const author = context.query.username;
  const headers = context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined
  const sessionUrl = `${server}/user`
  const postUrl = `${server}/posts?author=${author}&limit=15&skip=0`

  const response = await fetch(sessionUrl, {
    method: 'get',
    headers
  })
  const session = await response.json();

  const res =  await fetch(postUrl, {
    method: "get",
    headers
    })
    const posts = await res.json()

  return {
    props: {
      session,
      author,
      posts
    }
  }
}