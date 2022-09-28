import type { NextPage, NextPageContext } from "next";
import { getSession, ssrHeaders } from "../../components/API/ssrAPI";
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
  const imagePreview = `${siteUrl}/imagePreview.png`;
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

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const author = context.query.username;
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const postUrl = `${server}/posts?author=${author}&limit=15&skip=0`;
    const session = await getSession(context);
    const res = await fetch(postUrl, {
      method: 'GET',
      headers : ssrHeaders(context),
    })
    if (res.ok) {
      const posts: PostProps[] = await res.json();
      return {
        props: {
          session,
          posts,
          author
        },
      }
    }
  } catch (err) {
    const error = `Sorry we couldn't load post for this page.`;
    return {
      props: {
        error
      }
    }
  }
}