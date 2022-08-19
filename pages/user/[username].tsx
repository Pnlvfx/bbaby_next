import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import UserContext from "../../components/auth/UserContext";
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
  const {session} = useContext(UserContext) as SessionProps;
  const imagePreview = session?.user.avatar
  const card = 'summary_large_image';

  return (
   <div>
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
      <AuthorHeaderPage />
        <Feed author={author} posts={posts} />
     </Layout>
   </div>
  )
}

export default Username;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const author = context.query.username;
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
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