import { useRouter } from "next/router";
import {useEffect, useState} from 'react'
import Post from '../../components/post/Post' 
import Head from "next/head";
import type { NextPage, NextPageContext } from "next";
import { search } from "../../components/header/search/APisearch";
import { getSession } from "../../components/API/ssrAPI";
import { siteUrl } from "../../components/main/config";

const SearchResultPage: NextPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[] | []>([]);
  const imagePreview = `${siteUrl}/imagePreview.png`;
  const title = `Bbabystyle.com: search result`;
  const url = `${siteUrl}/search`;
  const description = "Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle.";
  const card = 'summary';

  useEffect(() => {
    if (router.query) {
      const {text} = router.query
      search(text).then(res => {
        setPosts(res);
        //setCommunities(response.data.communities);
      })
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <div>
      {posts.map(post => (
        <Post key={post._id} post={post} isListing={true} />
      ))}
    </div>
    </>
  )
}

export default SearchResultPage;

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
    },
  }
}
