import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Layout from "../../../components/main/Layout";
import { getBBCLinks } from "../../../components/API/governance/governanceNewsAPI";
import { getSession } from "../../../components/API/ssrAPI";
import GovernanceCtrl from "../../../components/governance/GovernanceCtrl";
import GovernanceMainMenù from "../../../components/governance/GovernanceMainMenù";
import LinkPreview, { LinkPreviewLoader, LinkPreviewProps } from "../../../components/utils/LinkPreview";
import Errorpage from "../../500";
import { useState } from "react";
import { siteUrl } from "../../../components/main/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { catchError } from "../../../components/API/common";

type BBCnewsProps = {
  ssrBBCnews: LinkPreviewProps[]
}

const GovNewsPage:NextPage<BBCnewsProps> = ({ssrBBCnews}) => {
  const [BBCnews, setBBCnews] = useState(ssrBBCnews);
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

  return (
    <>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Layout>
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
                  {BBCnews.map((news, key) => (
                    <div key={key}>
                      {news.title && news.description && news.image ? (
                        <LinkPreview title={news.title} description={news.description} image={news.image} link={news.link} />
                      ) : (
                        <LinkPreviewLoader />
                      )}
                    </div>
                    ))
                  }
                </ul>
              </InfiniteScroll>
        </GovernanceCtrl>
      </Layout>
    </>
  )
}

export default GovNewsPage;

export const getServerSideProps = async(context: NextPageContext) => {
  let session = null;
  let ssrBBCnews: BBCnewsProps[] | [
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
  ] = [
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
  ];
  try {
    session = await getSession(context);
    //ssrBBCnews = await getBBCLinks(10, 0, context);
  } catch (err) {
    Errorpage
  }

  return {
    props: {
      session,
      ssrBBCnews
    },
  }
}