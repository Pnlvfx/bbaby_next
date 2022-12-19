import type { NextPage, NextPageContext } from 'next';
import { getSession } from '../../components/API/ssrAPI';
import CEO from '../../components/main/CEO';
import { siteUrl } from '../../components/main/config';
import { getOneNews } from '../../components/mynews/APInews';
import MyNewsCard from '../../components/mynews/MyNewsCard';
import Donations from '../../components/widget/Donations';
import PolicyWidget from '../../components/widget/PolicyWidget';
import Widget from '../../components/widget/Widget';

interface NewsIdPageProps {
  news: NewsProps
}

const NewsIdPage: NextPage<NewsIdPageProps> = ({ news }) => {
  const {title} = news;
  const description = news.description.substring(0, 250);
  const image = news.mediaInfo.image
  const url = `${siteUrl}/news/${news.title}`;

  return (
    <>
    <CEO 
      title={title}
      description={description}
      twitter_card='summary_large_image'
      type='article'
      url={url}
      image={image}
      height={news.mediaInfo.height.toString()}
      width={news.mediaInfo.width.toString()}
      index={true}
    />
    <div className="max-w-full md:py-5 md:px-6 box-border flex justify-center mx-auto">
        <div className="w-full lg:w-[640px]">
            <MyNewsCard news={news} isListing={false} />
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

export default NewsIdPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    let {permalink} = context.query
    if (!permalink) throw new Error(`Missing title parameters.`);
    const news = await getOneNews(permalink.toString(), context);
    return {
      props: {
        session,
        news: news as NewsProps
      },
    }
  } catch (err) {
    const error = `Sorry we couldn't load this post.`;
    return {
      props: {
        error
      }
    }
  }
}
