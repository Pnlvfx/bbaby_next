import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { catchErrorWithMessage } from '../../components/API/common';
import { getSession } from '../../components/API/ssrAPI';
import GovernanceCtrl from '../../components/governance/GovernanceCtrl';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import RedditFeed from '../../components/governance/reddit/RedditFeed';
import { TimeMsgContext, TimeMsgContextProps } from '../../components/main/TimeMsgContext';
import BestPost from '../../components/post/postutils/BestPost';
import PostForm from '../../components/submit/submitutils/PostForm';

const RedditPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
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
        const p = await res.json();
        setRedditPosts(p.data.children)
      } else {
        message.setMessage({value: res.statusText, status: 'error'})
      }
    } catch (err) {
      catchErrorWithMessage(err, message);
    }
  }

  useEffect(() => {
    const res = async () => {
      await getRedditPosts();
    }
    res();
  }, []);

  if (!redditPosts) return null;

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
        <GovernanceCtrl>
          <GovernanceMainMenù />
            <RedditFeed 
            postForm={<PostForm />}
            bestPost={<BestPost />}
            posts={redditPosts}
            />
        </GovernanceCtrl>
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
