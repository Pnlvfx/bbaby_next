import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getBBCLinks } from "../../../components/API/governance/governanceNewsAPI";
import { getSession } from "../../../components/API/ssrAPI";
import GovernanceCtrl from "../../../components/governance/GovernanceCtrl";
import GovernanceMainMenù from "../../../components/governance/GovernanceMainMenù";
import LinkPreview, { LinkPreviewLoader } from "../../../components/utils/LinkPreview";
import { useEffect, useState } from "react";
import { siteUrl } from "../../../components/main/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { catchErrorWithMessage } from "../../../components/API/common";
import { useMessage } from "../../../components/main/TimeMsgContext";

const GovNewsPage: NextPage = () => {
  const [BBCnews, setBBCnews] = useState<ExternalNews[] | []>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const url = `${siteUrl}/governance/news`;
  const message = useMessage();

  const getMore = async () => {
    try {
      if (total <= BBCnews.length) return setHasMore(false);
      const res = await getBBCLinks(10, BBCnews.length);
      const newArticle = res.data;
      setBBCnews(oldNews => [...oldNews, ...newArticle])
    } catch (err) {
      catchErrorWithMessage(err, message);
    }
  }

  useEffect(() => {
    const get = async () => {
      try {
        const res = await getBBCLinks(16, 0);
        setBBCnews(res.data);
        setTotal(res.total);
      } catch (err) {
        catchErrorWithMessage(err, message);
      }
    }
    get();
  },[]);

  return (
    <>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <InfiniteScroll
          className='md:space-x-auto grid grid-cols-1 md:grid-cols-3 w-full mt-5'
          dataLength={BBCnews.length}
          next={getMore}
          hasMore={hasMore}
          loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
            <LinkPreviewLoader key={idx} />
          ))}
          endMessage={<p>No more news.</p>}
        >
          {BBCnews.map((news, key) => (
            <LinkPreview
              key={key}
              title={news.title} 
              url={news.permalink}
              description={news.description}
              image={news.image} 
              date={news.date}
            />
          ))}
        </InfiniteScroll>
      </GovernanceCtrl>
    </>
  )
}

export default GovNewsPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we will fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}