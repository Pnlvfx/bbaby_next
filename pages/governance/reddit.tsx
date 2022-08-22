import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../components/API/ssrAPI';
import GovernanceCtrl from '../../components/governance/GovernanceCtrl';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import Layout from '../../components/main/Layout';
import { TimeMsgContext, TimeMsgContextProps } from '../../components/main/TimeMsgContext';

const RedditPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const [redditPosts,setRedditPosts] = useState([])

  const getRedditPosts = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/reddit/posts`
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include'
      })
      if (res.ok) {
        const p = await res.json()
        setRedditPosts(p)
      } else {
        setMessage({value: res.statusText, status: 'error'})
      }
    } catch (err) {
      
    }
  }

  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page - Reddit</title>
        <meta name='robots' content='noindex' />
        <link
          rel="canonical"
          href={`${hostname}/governance/reddit`}
          key="canonical"
        />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <button onClick={() => {
            getRedditPosts()
          }}>
            temp post call
          </button>
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default RedditPage;

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
    },
  }
}
