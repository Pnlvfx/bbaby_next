import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getBBCLinks } from "../../../components/API/governance/governanceNewsAPI";
import { getSession } from "../../../components/API/ssrAPI";
import GovernanceCtrl from "../../../components/governance/GovernanceCtrl";
import GovernanceMainMenù from "../../../components/governance/GovernanceMainMenù";
import LinkPreview, { LinkPreviewLoader, LinkPreviewProps } from "../../../components/utils/LinkPreview";
import { useEffect, useState } from "react";
import { siteUrl } from "../../../components/main/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { catchError } from "../../../components/API/common";

const GovNewsPage:NextPage = () => {
  const [BBCnews, setBBCnews] = useState<LinkPreviewProps[] | []>([]);
  const url = `${siteUrl}/governance/news`;

  const getMore = async () => {
    try {
      const res = await getBBCLinks(10, BBCnews.length);
      const newArticle = res;
      setBBCnews(oldNews => [...oldNews, ...newArticle])

    } catch (err) {
      catchError(err)
    }
  }

  useEffect(() => {
    getBBCLinks(10, 0).then((res) => {
      setBBCnews(res);
    })
  },[])

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
              dataLength={BBCnews.length}
              scrollThreshold={''}
              next={getMore}
              hasMore={true}
              loader={LinkPreviewLoader()}
              endMessage={<p></p>}
            >
              <ul className="md:space-x-auto grid-cols-1 md:grid-cols-3" style={{width: '100%', marginTop: 20, display: 'grid'}}>
                {BBCnews.length > 9 ?
                  BBCnews.map((news, key) => (
                    <LinkPreview key={key} title={news.title} description={news.description} image={news.image} link={news.link} />
                  )) : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, idx) => (
                    <LinkPreviewLoader key={idx} />
                  ))}
              </ul>
            </InfiniteScroll>
      </GovernanceCtrl>
    </>
  )
}

export default GovNewsPage;

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