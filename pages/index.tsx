import type { GetServerSideProps, NextPage } from 'next';
import Feed from '../components/post/Feed';
import Layout from '../components/main/Layout';
import CEO from '../components/main/CEO';

type HomePg = {
  posts: PostProps
}

const Home: NextPage<HomePg> = ({ posts }) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const image = `${hostname}/imagePreview.png`
  const title = "Bbabystyle - Free speech"
  const type = 'website'
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.'
  const twitter_card = 'summary';
  const url = hostname;
  const locale = 'en-US'

  return (
    <>
    <CEO
      title={title}
      url={url}
      description={description}
      twitter_card={twitter_card}
      type={type}
      image={image}
      locale={locale}
    />
    <Layout>
      <Feed posts={posts} />
    </Layout>
    </>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
  const sessionUrl = `${server}/user`;
  const postUrl = `${server}/posts?limit=15&skip=0`;
  const headers = context?.req?.headers?.cookie
    ? { cookie: context.req.headers.cookie }
    : undefined

  const response = await fetch(sessionUrl, {
    method: 'get',
    headers,
  })
  const session = await response.json()

  const res = await fetch(postUrl, {
    method: 'get',
    headers,
  })
  const posts = await res.json();

  return {
    props: {
      session,
      posts,
    },
  }
}
