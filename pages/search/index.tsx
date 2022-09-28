import { NextPage, NextPageContext } from "next";
import { getPosts } from "../../components/API/postAPI";
import { getSession } from "../../components/API/ssrAPI";
import { search } from "../../components/header/search/APIsearch";
import Search from "../../components/search/Search";

export interface SearchPageProps {
  posts: PostProps[]
}

const SearchPage: NextPage<SearchPageProps> = ({posts}) => {
  return (
    <Search posts={posts} />
  )
}

export default SearchPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    const type = context.query.type ? context.query.type : undefined;
    const text = context.query.text ? context.query.text : undefined;
    let posts = []
    if (text) {
      posts = await search(text);
    } else {
      posts = await getPosts(undefined, undefined, 0);
    }

    return {
      props: {
        session,
        posts
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}
