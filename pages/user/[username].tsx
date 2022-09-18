import type { NextPage, NextPageContext } from "next";
import { useContext } from "react";
import { getSession, ssrHeaders } from "../../components/API/ssrAPI";
import UserContext from "../../components/auth/UserContext";
import CEO from "../../components/main/CEO";
import { siteUrl } from "../../components/main/config";
import Feed from "../../components/post/Feed";
import AuthorHeaderPage from "../../components/user/AuthorHeaderPage";

type AuthorPg = {
  author: string,
  posts: PostProps[]
}

const Username:NextPage<AuthorPg> = ({author, posts}) => {
  const title = `${author}`
  const description = `${author}`
  const url = `${siteUrl}/user/${author}`
  const {session} = useContext(UserContext) as SessionProps;
  const imagePreview = session?.user.avatar
  const twitter_card = 'summary_large_image';

  return (
   <>
    <CEO
      title={title}
      description={description}
      twitter_card={twitter_card}
      type={'website'}
      url={url}
      image={imagePreview}
    />
  <AuthorHeaderPage />
  <Feed author={author} posts={posts} />
   </>
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
  return {
    props: {
      session,
      author,
      posts,
    },
  }
}