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
      <div className="flex flex-col" style={{minHeight: 'calc(100vh - 48px)'}}>
        <div className="z-[3]">
          <div className=' max-w-[1248px] md:py-5 md:px-6 flex flex-row justify-center box-border my-0 mx-auto'>
            <div className="lg:max-w-[740px] mr-0 w-full pt-5 md:mr-6 lg:w-[740px]" style={{flexBasis: '100%', flexGrow: 1, flexShrink: 1}}>
              <SubmitLayout />
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
  try {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}
