import { useRouter } from "next/router";
import {useEffect, useState} from 'react'
import Post from '../../components/post/Post' 
import Layout from "../../components/main/Layout";
import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { search } from "../../components/header/search/APisearch";

const SearchResultPage:NextPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[] | []>([]);
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = `${hostname}/imagePreview.png`;
  const title = `Bbabystyle.com: search result`
  const url = `${hostname}/search`
  const description = "Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle."
  const card = 'summary';

  useEffect(() => {
    if (router.query) {
      const {text} = router.query
      search(text).then(res => {
        setPosts(res);
        //setCommunities(response.data.communities);
      })
    }
  },[router])

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
      <Layout>
        <div>
        {posts.map(post => (
          <Post key={post._id} post={post} isListing={true} />
        ))}
      </div>
      </Layout>
    </>
  )
}

export default SearchResultPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
  const headers = context?.req?.headers?.cookie ? { cookie: context.req.headers.cookie } : undefined;
  const url = `${server}/user`
  const response = await fetch(url, {
    method: 'get',
    headers
  })
  const session = await response.json();

  return {
    props: {
      session,
    },
  }
}
