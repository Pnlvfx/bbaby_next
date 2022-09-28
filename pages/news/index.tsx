import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { getSession } from '../../components/API/ssrAPI';
import { getMyNews } from '../../components/mynews/APInews';
import MyNewsCard from '../../components/mynews/MyNewsCard';
import BestPost from '../../components/post/postutils/BestPost';

interface MyNewsPageProps {
  myNews: NewsProps[]
}

const MyNewsPage:NextPage<MyNewsPageProps> = ({ myNews }) => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const imagePreview = `${hostname}/imagePreview.png`
  const title = "Bbabystyle - News in italiano"
  const description = "Bbabystyle - News in italiano"
  const url = `${hostname}/news`
  const card = 'summary';
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <div className="mx-[2px] mt-5 flex justify-center lg:mx-10">
          <div className="w-full lg:w-7/12  lg:mr-4 2xl:w-[650px] flex-none">
            <div className="mb-4">
              <BestPost />
            </div>
            {myNews?.map((news) => (
              <MyNewsCard key={news._id} news={news} isListing={true} />
            ))}
          </div>
      </div>
    </div>
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