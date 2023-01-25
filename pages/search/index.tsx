import { NextPage, NextPageContext } from 'next'
import searchapis from '../../components/API/searchapis'
import postapis from '../../components/API/postapis/postapis'
import { getSession } from '../../components/API/ssrAPI'
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
    const text = context.query.text
    let posts = []
    if (text) {
      posts = await searchapis.search(text.toString())
    } else {
      posts = await postapis.getPosts(0, {
        context,
        limit: 15,
      })
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
