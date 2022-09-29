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

  return (
    <>
      <CEO
        title={title}
        url={url}
        description={description}
        twitter_card={twitter_card}
        type={type}
        image={image}
        width={'256'}
        height={'256'}
        index={true}
      />
      <div className='max-w-[1248px] flex flex-row justify-center box-border my-0 mx-auto md:py-5 md:px-6'>
        <div className="lg:max-w-[740px] w-full md:mr-6 lg:w-[640px] flex-1">
          <SubmitLayout />
        </div>
        <div className="mt-11 hidden lg:block">
          <TempSubmitWid />
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
