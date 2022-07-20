import axios from 'axios';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Modqueque from '../../../../components/community/modqueque/Modqueque';
import Layout from '../../../../components/Layout';

function ModqueuePage() {
  return (
    <div>
      <Head>
        <title>Bbabystyle - community admin page </title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout>
        <Modqueque />
      </Layout>
    </div>
  )
}

export default ModqueuePage;

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data
  return {
    props: {
      session: session,
    }
  }
}