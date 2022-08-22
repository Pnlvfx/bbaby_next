import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'
import { getSession, ssrHeaders } from '../../components/API/ssrAPI'
import Layout from '../../components/main/Layout'
import MyNewsCard from '../../components/mynews/MyNewsCard'
import Donations from '../../components/widget/Donations'

interface NewsIdPageProps {
  news: NewsProps
}

const NewsIdPage: NextPage<NewsIdPageProps> = ({news}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {title} = news;
  const description = news.description.substring(0, 250);
  const imagePreview = news.mediaInfo.image
  const url = `${hostname}/news/${news._id}`;
  const card = 'summary_large_image'

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
        <meta name="twitter:image:alt" content={news.mediaInfo.alt} />
      </Head>
      <Layout>
        <div className='flex mt-5 justify-center mx-[0px] lg:mx-10'>
          <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[750px] mr-4 flex-none'>
            <MyNewsCard news={news} />
          </div>
          <div className='hidden lg:block'>
            <Donations />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default NewsIdPage;

export const getServerSideProps = async(context: NextPageContext) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const {newsId} = context.query;
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }
  const newsUrl = `${server}/news/${newsId}`
  const res = await fetch(newsUrl, {
    method: 'get',
    headers: ssrHeaders(context)
  })
  const news = await res.json();
  return {
    props: {
      session,
      news: news as NewsProps
    },
  }
}
