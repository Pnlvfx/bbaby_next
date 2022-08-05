import { useRouter } from "next/router";
import {useEffect, useState} from 'react'
import Post from '../../components/post/Post' 
import Layout from "../../components/main/Layout";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { search } from "../../components/header/search/APisearch";

const SearchResultPage:NextPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[] | []>([]);
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png';
  const title = `Bbabystyle.com: search result`
  const url = `${hostname}/search`

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
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content={title} key='ogtitle' />
        <meta name="description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." />
        <meta property="og:description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={url} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
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
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
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
