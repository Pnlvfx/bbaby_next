import type { NextPage, NextPageContext } from 'next'
import CEO from '../components/main/CEO'
import { getSession } from '../components/API/ssrAPI'
import Feed from '../components/post/Feed'
import { siteUrl } from '../components/main/config'
import postapis from '../components/API/postapis/postapis'

type HomePg = {
  posts: PostProps[]
}

const Home: NextPage<HomePg> = ({ posts }) => {
  const image = `${siteUrl}/imagePreview.png`
  const title = 'Bbabystyle - Free speech'
  const type = 'website'
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.'
  const twitter_card = 'summary'

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

export default Home

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const posts = await postapis.getPosts(0, {
      context,
      limit: 15,
    })
    return {
      props: {
        session,
        posts,
      },
    }
  } catch (err) {
    const error = `Sorry we couldn't load post for this page.`
    return {
      props: {
        error,
      },
    }
  }
}
