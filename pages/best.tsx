import type { NextPage, NextPageContext } from 'next';
import Feed from '../components/post/Feed';
import { siteUrl } from '../components/main/config';
import { getSession, ssrHeaders } from '../components/API/ssrAPI';
import CEO from '../components/main/CEO';

type BestPg = {
  posts: PostProps[]
}

const Best: NextPage<BestPg> = ({posts}) => {
  const title = "Bbabystyle - Free speech";
  const imagePreview = `${siteUrl}/imagePreview.png`;
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.';
  const twitter_card = 'summary';

  return (
    <>
    <CEO
      title={title}
      description={description}
      twitter_card={twitter_card}
      type={'website'}
      url={siteUrl}
      image={imagePreview}
      width={'256'}
      height={'256'}
      index={true}
    />
    <Feed posts={posts} />
    </>
  )
}

export default Best;

export const getServerSideProps = async(context: NextPageContext) => {
  try {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const postUrl = `${server}/posts?limit=15&skip=0`;
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