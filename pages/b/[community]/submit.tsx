import { useEffect, useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next';
import Layout from '../../../components/main/Layout';
import { useRouter } from 'next/router';
import TempSubmitWid from '../../../components/widget/TempSubmitWid';
import SubmitLayout from '../../../components/submit/SubmitLayout';

const SubmitPage:NextPage = () => {
  const router = useRouter()
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const title = 'Submit to Bbabystyle';
  const description = 'Create your own article here. Choose an existing community or create your own and start change the world.'
  const community: string | string[] | undefined = router.query.community ? router.query.community : undefined
  const [communityName,setCommunityName] = useState<string | string [] | undefined>('')

  useEffect(() => {
    if(!router.isReady) return;
    if(community !== undefined) {
      setCommunityName(community)
    }
  },[community, router.isReady])
  
  return (
    <>
    <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content={title} key='ogtitle' />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} key='ogdesc'/>
        <meta property="og:image" content={hostname + '/imagePreview.png'} key='ogimage' />
        <meta property="og:url" content={hostname + '/submit'} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="" />
        <link rel='canonical' href={`${hostname}/submit`} key='canonical' />
    </Head>
      <Layout>
        <div className="p-2 sm:p-4 block lg:flex">
          <div className="mx-auto flex justify-center">
            <div className="mr-0 md:mr-6 w-full lg:w-[740px] pt-5">
                <SubmitLayout community={communityName} />
            </div>
            <div className="hidden lg:block mt-11">
              <TempSubmitWid />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SubmitPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
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