import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react'
import Layout from '../../components/main/Layout';
import MyNews from '../../components/mynews/MyNews';

const MyNewsPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = '/imagePreview.png'
  return (
    <div>
      <Head>
      <title>Bbabystyle - News in italiano </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Bbabystyle - News in italiano"
          key="ogtitle"
        />
        <meta name="description" content="Bbabystyle - News in italiano" />
        <meta
          property="og:description"
          content="Bbabystyle - News in italiano"
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={hostname + imagePreview}
          key="ogimage"
        />
        <meta property="og:url" content={hostname} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image:alt"
          content="This image contain the logo of this website"
        />
        <link rel="canonical" href={`${hostname}/news`} key="canonical" />
      </Head>
      <Layout>
        <MyNews />
      </Layout>
    </div>
  )
}

export default MyNewsPage;


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