import type { NextPage, NextPageContext } from 'next'
import Feed from '../components/post/Feed'
import { siteUrl } from '../components/main/config'
import { getSession } from '../components/API/ssrAPI'
import CEO from '../components/main/CEO'
import postapis from '../components/API/postapis/postapis'

type BestPg = {
  posts: PostProps[]
}

const Best: NextPage<BestPg> = ({ posts }) => {
  const title = 'Bbabystyle - Free speech'
  const imagePreview = `${siteUrl}/imagePreview.png`
  const description = 'Bbabystyle is a network where you can create your community and start to talk about whatever you want.'
  const twitter_card = 'summary'

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

export default Best

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
