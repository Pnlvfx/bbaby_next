import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Modqueque from '../../../../components/community/modqueque/Modqueque';
import { siteUrl } from '../../../../components/main/config';

interface ModqueuePageProps {
  community: string
}

const ModqueuePage:NextPage<ModqueuePageProps> = ({community}) => {
  const url = `${siteUrl}/b/${community}/about/modqueque`
  return (
    <div>
      <Head>
        <title>Bbabystyle - community admin page </title>
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Modqueque />
    </div>
  )
}

export default ModqueuePage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
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