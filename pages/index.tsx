import type { NextPage, NextPageContext } from 'next';
import CEO from '../components/main/CEO';
import { getSession, ssrHeaders } from '../components/API/ssrAPI';
import Feed from '../components/post/Feed';
import { siteUrl } from '../components/main/config';

type HomePg = {
  posts: PostProps[]
}

const Home: NextPage<HomePg> = ({ posts }) => {
  const image = `${siteUrl}/imagePreview.png`;
  const title = "Bbabystyle - Free speech";
  const type = 'website';
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.';
  const twitter_card = 'summary';

  return (
    <>
      <CEO
        title={title}
        url={siteUrl}
        description={description}
        twitter_card={twitter_card}
        type={type}
        image={image}
        width={'256'}
        height={'256'}
        index={true}
      />
      <Feed posts={posts} />
    </>
  )
}

export default Home;

export const getServerSideProps = async (context: NextPageContext) => {
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
