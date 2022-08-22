import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getBBCLinks } from "../../../components/API/governance/governanceNewsAPI";
import { getSession } from "../../../components/API/ssrAPI";
import GovernanceCtrl from "../../../components/governance/GovernanceCtrl";
import GovernanceMainMenù from "../../../components/governance/GovernanceMainMenù";
import Layout from "../../../components/main/Layout";
import LinkPreview from "../../../components/utils/link-preview/LinkPreview";
import Errorpage from "../../500";

type UrlsProps = {
  urls: string[]
}

const GovNewsPage:NextPage<UrlsProps> = ({urls}) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/news`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <ul className="md:space-x-auto grid w-full grid-cols-1 md:grid-cols-3 mt-5">
            {urls.map((url, key) => (
              <div key={key}>
                  <LinkPreview url={url} index={key} />
              </div>
              ))
            }
          </ul>
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default GovNewsPage;

export const getServerSideProps = async(context: NextPageContext) => {
  let session = null;
  let urls = null;
  try {
    session = await getSession(context);
    urls = await getBBCLinks(context);
  } catch (err) {
    Errorpage
  }

  return {
    props: {
      session,
      urls
    },
  }
}