import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl';
import { NewsContextProvider } from '../../components/governance/news/NewsContext';
import NewsPage from '../../components/governance/news/NewsPage';
import { postRequestHeaders } from '../../components/main/config';
import Layout from '../../components/main/Layout';

const NewsPagee:NextPage = () => {
    const router = useRouter()
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
    const [description,setDescription] = useState('')

    const getArticle = async () => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const serverUrl = `${server}/governance/news/article`
        const {url,imageUrl} = router.query
        const body = JSON.stringify({url,imageUrl})
        const res = await fetch(serverUrl, {
          method: 'post',
          body,
          headers: postRequestHeaders,
          credentials: 'include'
        })
        const article = res.json();
        return article
    }

    useEffect(() => {
        if (!router.isReady) return;
        let ignore = false;
        if (!ignore) {
          getArticle().then((article) => {
            setDescription(article.toString().replaceAll(',', ''))
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
          <meta name='robots' content='noindex' />
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