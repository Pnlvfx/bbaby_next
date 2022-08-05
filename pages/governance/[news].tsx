import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl';
import { NewsContextProvider } from '../../components/governance/news/NewsContext';
import NewsPage from '../../components/governance/news/NewsPage';
import Layout from '../../components/main/Layout';

const NewsPagee:NextPage = () => {
    const router = useRouter()
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const [description,setDescription] = useState('')

    const getArticle = async () => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const data = {url: router.query.url,imageUrl: router.query.imageUrl}
        const res = await axios.post(`${server}/governance/news/article`, data, {withCredentials:true})
        return res as AxiosResponse
    }

    useEffect(() => {
        if (!router.isReady) return;
        let ignore = false;
        if (!ignore) {
          getArticle().then((res) => {
            setDescription(res.data.toString().replaceAll(',', ''))
        })
        }
        return () => {
          ignore = true;
        }
    },[router])

  return (
    <div>
        <Head>
        <title>Bbabystyle - authority-onlypage</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance`} key='canonical' />
        </Head>
        <Layout>
            <GovernanceCtrl>
                {router && router.query.imageUrl && router.query.title && (
                  <NewsContextProvider>
                    <NewsPage title={router.query.title?.toString()} image={router.query.imageUrl?.toString()} description={description} />
                  </NewsContextProvider>
                )}
            </GovernanceCtrl>
        </Layout>
    </div>
  )
}

export default NewsPagee;

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