import { useEffect, useState } from 'react'
import Head from 'next/head'
import { NextPage, NextPageContext } from 'next';
import Layout from '../../../components/main/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import TempSubmitWid from '../../../components/widget/TempSubmitWid';
import SubmitLayout from '../../../components/submit/SubmitLayout';

const SubmitPage:NextPage = () => {
  const router = useRouter()
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME

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
        <title>Submit to bbabystyle</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Submit to Bbabystyle" key='ogtitle' />
        <meta name="description" content="Bbabystyle - Submit" />
        <meta property="og:description" content="Bbabystyle - Submit, it's free" key='ogdesc'/>
        <meta property="og:image" content={hostname + '/imagePreview.png'} key='ogimage' />
        <meta property="og:url" content={hostname + '/submit'} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={`${hostname}/submit`} key='canonical' />
    </Head>
      <Layout>
        <div className=" p-2 sm:p-4 block lg:flex">
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

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = response.data
  return {
    props: {
      session: session,
    }
  }
}