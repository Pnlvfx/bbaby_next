import { useEffect, useState } from 'react'
import Head from 'next/head'
import { NextPage, NextPageContext } from 'next';
import Layout from '../../../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import TempSubmitWid from '../../../components/widget/TempSubmitWid';
import Submit from '../../../components/submit/Submit';

const SubmitPage:NextPage = () => {

  const router = useRouter()
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME

  const community: any = router.query?.community ? router.query?.community : null

  const [communityName,setCommunityName] = useState('')

  useEffect(() => {
    if(!router.isReady) return;
    if(community) {
      setCommunityName(community)
    } else {
      return
    }
  }, [router.query])

  //console.log(context)
  
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
        <link rel='canonical' href={hostname + '/submit'} key='canonical' />
      </Head>
      <Layout>
      <div className=" p-2 sm:p-4 block lg:flex self-center">
          <div className="self-center mx-auto flex">
            <div className="pr-0 md:pr-3 w-full lg:w-[800px]">
              <Submit community={communityName} />
            </div>
            <div className="hidden lg:block pt-11 pr-3">
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
    const session = await response.data
  return {
    props: {
      session: session,
    }
  }
}