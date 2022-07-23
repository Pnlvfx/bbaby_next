import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import Feed from "../../components/post/Feed";

type AuthorPg = {
  author: string,
  posts: PostProps
}

const Username:NextPage<AuthorPg> = ({author,posts}) => {
  
  return (
   <div>
     <Head>
      <title>Bbabystyle - user profile page </title>
     </Head>
     <Layout>
      <Feed author={author} posts={posts} />
     </Layout>
   </div>
  )
}

export default Username;

export async function getServerSideProps(context: NextPageContext) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const author = context.query.username

  const res = await axios({
    method: 'get',
    url: `${server}/posts?author=${author}&limit=15&skip=0`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
  })
  const posts = res.data

  const response =  await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    })
    const session = response.data

  return {
    props: {
      session,
      author,
      posts
    }
  }
}