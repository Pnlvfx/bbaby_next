import axios from 'axios'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'
import Layout from '../../components/main/Layout'
import MyNewsCard from '../../components/mynews/MyNewsCard'
import Donations from '../../components/widget/Donations'

interface NewsIdPageProps {
  news: NewsProps
}

const NewsIdPage: NextPage<NewsIdPageProps> = ({news}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  return (
    <div>
      <Head>
        <title>{news.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={news.title}
          key="ogtitle"
        />
        <meta name="description" content={news.description.substring(0,250)} />
        <meta
          property="og:description"
          content={news.description.substring(0,250)}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={news.mediaInfo.image}
          key="ogimage"
        />
        <meta property="og:url" content={`${hostname}/news/${news._id}`} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image:alt"
          content={news.mediaInfo.alt}
        />
        <link rel="canonical" href={`${hostname}/news/${news._id}`} key="canonical" />
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

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const headers = context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined

  const response = await axios({
    method: 'get',
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie
      ? { cookie: context.req.headers.cookie }
      : undefined,
    withCredentials: true,
  })
  const session = response.data

  const {newsId} = query
  const res = await axios({
    method: 'get',
    url:`${server}/news/${newsId}`,
    headers
  })
  const news = res.data
  return {
    props: {
      session,
      news: news as NewsProps
    },
  }
}
