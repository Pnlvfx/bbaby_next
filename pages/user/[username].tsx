import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useContext } from "react";
import { getSession, ssrHeaders } from "../../components/API/ssrAPI";
import UserContext from "../../components/auth/UserContext";
import Feed from "../../components/post/Feed";
import AuthorHeaderPage from "../../components/user/AuthorHeaderPage";

type AuthorPg = {
  author: string,
  posts: PostProps[]
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
    <AuthorHeaderPage />
    <Feed author={author} posts={posts} />
   </div>
  )
}

export default Username;

export const getServerSideProps = async(context: NextPageContext) => {
  const author = context.query.username;
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const postUrl = `${server}/posts?author=${author}&limit=15&skip=0`;
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
      author,
      posts,
    },
  }
}