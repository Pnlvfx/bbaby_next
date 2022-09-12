import type { NextPage, NextPageContext } from 'next';
import TempSubmitWid from '../../../components/widget/TempSubmitWid';
import SubmitLayout from '../../../components/submit/SubmitLayout';
import { getSession } from '../../../components/API/ssrAPI';
import CEO from '../../../components/main/CEO';
import { siteUrl } from '../../../components/main/config';

interface SubmitPageProps {
  community: string
}

const SubmitPage:NextPage<SubmitPageProps> = ({ community }) => {
  const title = 'Submit to Bbabystyle';
  const description = 'Create your own article here. Choose an existing community or create your own and start change the world.'
  const imagePreview = `${siteUrl}/imagePreview.png`
  const url = `${siteUrl}/submit`
  
  return (
    <>
      <CEO
          title={title}
          url={url}
          description={description}
          twitter_card={'summary'}
          type={'website'}
          image={imagePreview}
      />
      <div className="flex flex-col" style={{minHeight: 'calc(100vh - 48px)'}}>
        <div className="z-[3]">
          <div className=' max-w-[1248px] md:py-5 md:px-6 flex flex-row justify-center box-border my-0 mx-auto'>
            <div className="lg:max-w-[740px] mr-0 w-full pt-5 md:mr-6 lg:w-[740px]" style={{flexBasis: '100%', flexGrow: 1, flexShrink: 1}}>
              <SubmitLayout community={community} />
            </div>
            <div className="mt-11 hidden lg:block">
              <TempSubmitWid />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitPage;

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  const {community} = context.query;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
      community
    },
  }
}