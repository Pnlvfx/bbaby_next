import type { NextPage, NextPageContext } from 'next';
import { getSession } from '../../components/API/ssrAPI';
import CEO from '../../components/main/CEO';
import { siteUrl } from '../../components/main/config';
import { getMyNews } from '../../components/mynews/APInews';
import MyNewsCard from '../../components/mynews/MyNewsCard';
import BestPost from '../../components/post/postutils/BestPost';
import Donations from '../../components/widget/Donations';
import PolicyWidget from '../../components/widget/PolicyWidget';
import Widget from '../../components/widget/Widget';

interface MyNewsPageProps {
  myNews: NewsProps[]
}

const MyNewsPage: NextPage<MyNewsPageProps> = ({ myNews }) => {
  const imagePreview = `${siteUrl}/imagePreview.png`;
  const title = "Bbabystyle - News in italiano";
  const description = "Bbabystyle - News in italiano";
  const url = `${siteUrl}/news`;
  
  return (
    <>
      <CEO 
        title={title}
        description={description}
        twitter_card='summary'
        type='website'
        url={url}
        image={imagePreview}
        width={'256'}
        height={'256'}
        index={true}
      />
      <div className="max-w-full md:py-5 md:px-6 box-border flex justify-center mx-auto">
        <div className="w-full lg:w-[640px]">
          <div className="mb-4">
            <BestPost />
          </div>
          <div>

          </div>
          {myNews?.map((news) => (
            <MyNewsCard key={news._id} news={news} isListing={true} />
          ))}
        </div>
        <div className='hidden lg:block ml-6'>
          <Widget />
          <Donations />
          <PolicyWidget />
        </div>
      </div>
    </>
  )
}

export default MyNewsPage;


export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    const myNews = await getMyNews(context);
    return {
      props: {
        session,
        myNews: myNews as NewsProps[]
      },
    }
  } catch (err) {
    const error = `Sorry we couldn't load post for this page.`;
    return {
      props: {
        error
      }
    }
  }
}