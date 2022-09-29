import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getSession, ssrHeaders } from "../../components/API/ssrAPI";
import CEO from "../../components/main/CEO";
import { siteUrl } from "../../components/main/config";
import Feed from "../../components/post/Feed";
import AuthorHeaderPage from "../../components/user/AuthorHeaderPage";

type AuthorPg = {
  author: string,
  posts: PostProps[]
}

const Username: NextPage<AuthorPg> = ({author, posts}) => {
  const title = `${author} (u/${author}) - Bbabystyle`
  const description = `u/${author}`
  const url = `${siteUrl}/user/${author}`
  const imagePreview = `${siteUrl}/imagePreview.png`;
  const twitter_card = 'summary';

  return (
   <>
    <CEO
      title={title}
      description={description}
      twitter_card={twitter_card}
      type={'website'}
      url={url}
      image={imagePreview}
      width={'256'}
      height={'256'}
      index={true} //is down here
    />
    <Head>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <AuthorHeaderPage />
    <Feed author={author} posts={posts} />
   </>
  )
}

export default Username;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const author = context.query.username;
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
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