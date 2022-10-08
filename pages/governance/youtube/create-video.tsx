import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getSession } from "../../../components/API/ssrAPI";
import { siteUrl } from "../../../components/main/config";

const CreateVideo: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page - youtube - video</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${siteUrl}/governance/youtube/create-video`} key='canonical' />
      </Head>
    </div>
  )
}

export default CreateVideo;

export const getServerSideProps = async (context: NextPageContext) => {
    try {
      const session = await getSession(context);
      return {
        props: {
          session,
        },
      }
    } catch (err) {
      const error = `Don't panic. Now we fix the issue!`
      return {
        props: {
          error
        }
      }
    }
}