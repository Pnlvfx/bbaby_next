import type { NextPage, NextPageContext } from "next";
import Leaderboard from "../../../components/leaderboard/Leaderboard";
import { getSession } from "../../../components/API/ssrAPI";
import CEO from "../../../components/main/CEO";
import { siteUrl } from "../../../components/main/config";

const LeaderboardPage:NextPage = () => {
  const title = "Today's Top Communities";
  const description = 'View Bbabystyle top communities. Filter to see view top communities in sports, gaming, news, television and more.';
  const imagePreview = `${siteUrl}/imagePreview.png`;
  const url = `${siteUrl}/bbaby/leaderboard`;

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

export default LeaderboardPage;

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