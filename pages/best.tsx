import type { GetServerSideProps, NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import axios from 'axios'
import Feed from '../components/post/Feed'
import Layout from '../components/Layout'


const Home: NextPage = () => {

  //metatags
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'

  return (
    <>
      <Head>
        <title>Bbabystyle - free spech </title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Bbabystyle - free speech" key='ogtitle' />
        <meta name="description" content="Bbabystyle - Best post" />
        <meta property="og:description" content="Bbabystyle - Best Post" key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={`${hostname}/best`} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={`${hostname}/best`} key='canonical' />
      </Head>
       <Layout>
        <Feed />
      </Layout>
    </>
  )
}

export default Home

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