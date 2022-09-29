import type { NextPage, NextPageContext } from 'next';
import { getSession } from '../../../components/API/ssrAPI';
import Leaderboard from '../../../components/leaderboard/Leaderboard';
import CEO from '../../../components/main/CEO';
import { siteUrl } from '../../../components/main/config';

interface Props {
  category: string
}

const CategoryPage:NextPage<Props> = ({ category }) => {
    const title = "Today's Top Communities";
    const description = 'View Bbabystyle top communities. Filter to see view top communities in sports, gaming, news, television and more.';
    const url = `${siteUrl}/bbaby/leaderboard/${category}`;
    const imagePreview = `${siteUrl}/imagePreview.png`;
    
  return (
    <>
    <CEO 
      description={description}
      title={title}
      twitter_card='summary'
      type="website"
      url={url}
      index={false}
      image={imagePreview}
      width={'256'}
      height={'256'}
    />
    <Leaderboard />
    </>
  )
}

export default CategoryPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    const {category} = context.query;
    return {
      props: {
        session,
        category
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