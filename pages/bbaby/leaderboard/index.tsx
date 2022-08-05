import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import Layout from "../../../components/main/Layout"
import Leaderboard from "../../../components/leaderboard/Leaderboard"

const LeaderboardPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'
  const [active,setActive] = useState(0)

  return (
    <div>
      <Head>
        <title>Today&apos;s Top Communities</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Today's Top Communities" key='ogtitle' />
        <meta name="description" content="Bbabystyle - all best communities" />
        <meta property="og:description" content="Bbabystyle - all best communities" key='ogdesc' />
        <meta property="og:image" content={hostname + imagePreview} key='ogimage' />
        <meta property="og:url" content={`${hostname}/bbaby/leaderboard`} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={`${hostname}/bbaby/leaderboard`} key='canonical' />
      </Head>
      <Layout>
        <Leaderboard />
      </Layout>
    </div>
  )
}

export default LeaderboardPage;

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