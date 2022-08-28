import type { NextPage, NextPageContext } from 'next';
import { siteUrl } from '../components/main/config';
import CEO from '../components/main/CEO';
import TempSubmitWid from '../components/widget/TempSubmitWid';
import SubmitLayout from '../components/submit/SubmitLayout';
import { getSession } from '../components/API/ssrAPI';

const SubmitPage: NextPage = () => {
  const url = `${siteUrl}/submit`
  const title = 'Submit to Bbabystyle';
  const image = `${siteUrl}/imagePreview.png`;
  const description = 'Create your post. Choose an existing community or create your own and start to share your content.'
  const twitter_card = 'summary';
  const type = 'website';
  const locale = 'en-US';

  return (
    <>
      <CEO
        title={title}
        url={url}
        description={description}
        twitter_card={twitter_card}
        type={type}
        image={image}
        locale={locale}
      />
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
