import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Modqueque from '../../../../components/community/modqueque/Modqueque';
import Layout from '../../../../components/main/Layout';

interface ModqueuePageProps {
  community: string
}

const ModqueuePage:NextPage<ModqueuePageProps> = ({community}) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const url = `${hostname}/b/${community}/about/modqueque`
  return (
    <div>
      <Head>
        <title>Bbabystyle - community admin page </title>
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Layout>
        <Modqueque />
      </Layout>
    </div>
  )
}

export default ModqueuePage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const {community} = context.query
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
      community
    },
  }
}