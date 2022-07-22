import { useRouter } from "next/router";
import {useEffect, useState} from 'react'
import Post from '../../components/post/Post' 
import axios from "axios";
import Layout from "../../components/Layout";
import Head from "next/head";
import { GetServerSideProps } from "next";


const SearchResultPage = () => {

  const router = useRouter();
  const {text} = router.query
  const [posts, setPosts] = useState<any[]>([]);
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'


  useEffect(() => {
    if (router.query) {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      axios.get(server+'/search?phrase='+text, {withCredentials:true})
      .then(response => {
        setPosts(response.data.posts);
        //setCommunities(response.data.communities);
      })
    }
  },[router.query])
  return (
    <>
      <Head>
        <title>Bbabystyle.com: search result</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Bbabystyle.com: search result" key='ogtitle' />
        <meta name="description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." />
        <meta property="og:description" content="Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle." key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={hostname} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={`${hostname}`} key='canonical' />
      </Head>
      <Layout>
        <div>
        {posts.map(post => (
          <Post key={post._id} post={post}/>
        ))}
      </div>
      </Layout>
    </>
  )
}

export default SearchResultPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response =  await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    })
    const session = response.data

  return {
    props: {
      session: session,
    }
  }
}
