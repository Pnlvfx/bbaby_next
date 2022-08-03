import Head from 'next/head'
import { NextPage, NextPageContext } from 'next'
import Layout from '../components/main/Layout'
import axios from 'axios'
import TempSubmitWid from '../components/widget/TempSubmitWid'
import SubmitLayout from '../components/submit/SubmitLayout'

const SubmitPage: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const title = 'Submit to Bbabystyle';
  const description = 'Create your own article here. Choose an existing community or create your own and start change the world.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={title}
          key="ogtitle"
        />
        <meta name="description" content={description} />
        <meta
          property="og:description"
          content={description}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={hostname + '/imagePreview.png'}
          key="ogimage"
        />
        <meta property="og:url" content={hostname + '/submit'} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image:alt"
          content="This image contain the logo of this website"
        />
        <link rel="canonical" href={hostname + '/submit'} key="canonical" />
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

export default SubmitPage

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response = await axios({
    method: 'get',
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie
      ? { cookie: context.req.headers.cookie }
      : undefined,
    withCredentials: true,
  })
  const session = response.data
  return {
    props: {
      session,
    },
  }
}
