import { useEffect, useState } from 'react'
import Head from 'next/head'
import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import Layout from '../../../components/main/Layout';
import { useRouter } from 'next/router';
import TempSubmitWid from '../../../components/widget/TempSubmitWid';
import SubmitLayout from '../../../components/submit/SubmitLayout';
import { getSession } from '../../../components/API/ssrAPI';

const SubmitPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const title = 'Submit to Bbabystyle';
  const description = 'Create your own article here. Choose an existing community or create your own and start change the world.'
  const imagePreview = `${hostname}/imagePreview.png`
  const url = `${hostname}/submit`
  const card = 'summary'
  const router = useRouter()
  const {community} = router.query
  const [communityName,setCommunityName] = useState('')

  useEffect(() => {
    if(!router.isReady) return;
    if(community !== undefined) {
      setCommunityName(community.toString())
    }
  },[community, router.isReady])
  
  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key={'description'} />
      <meta property='og:ttl' content='600' key={'ogttl'} />
      <meta property="og:site_name" content="bbabystyle" />
      <meta property="twitter:card" content={card} key="twcard" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:image" content={imagePreview} key="ogimage" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:type" content="website" key="ogtype" />
      <link rel='canonical' href={url} key='canonical' />
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

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
    },
  }
}