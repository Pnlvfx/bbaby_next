import { NextPage, NextPageContext } from 'next'
import postapis from '../../components/API/postapis'
import { getSession } from '../../components/API/ssrAPI'
import { search } from '../../components/header/search/APIsearch'
import Search from '../../components/search/Search'

export interface SearchPageProps {
  posts: PostProps[]
}

const SearchPage: NextPage<SearchPageProps> = ({ posts }) => {
  return <Search posts={posts} />
}

export default SearchPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const text = context.query.text ? context.query.text : undefined
    let posts = []
    if (text) {
      posts = await search(text.toString())
    } else {
      posts = await postapis.getPosts(0)
    }

    return {
      props: {
        session,
        posts,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
