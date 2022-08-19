import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from '../components/main/Layout';
import TempSubmitWid from '../components/widget/TempSubmitWid';
import SubmitLayout from '../components/submit/SubmitLayout';

const SubmitPage: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const url = `${hostname}/submit`
  const title = 'Submit to Bbabystyle';
  const imagePreview = `${hostname}/imagePreview.png`;
  const description = 'Create your post. Choose an existing community or create your own and start to share your content.'
  const card = 'summary';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Layout>
        <div className="block p-2 sm:p-4 lg:flex">
          <div className="mx-auto flex justify-center">
            <div className="mr-0 w-full pt-5 md:mr-6 lg:w-[740px]">
              <SubmitLayout />
            </div>
            <div className="mt-11 hidden lg:block">
              <TempSubmitWid />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SubmitPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
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
    },
  }
}
