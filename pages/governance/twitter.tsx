import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Layout from "../../components/Layout";
import Twitter from "../../components/governance/twitter/Twitter";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";

const TwitterPage: NextPage = () => {
  return (
    <div className="w-full h-[1000px]">
      <Layout>
        <GovernanceCtrl>
          <Twitter />
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default TwitterPage;

export async function getServerSideProps(context: NextPageContext) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response =  await axios({
    method: "get",
    url: `${server}/user/admin`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    })
    const session = await response.data

  return {
    props: {
      session: session,
    }
  }
}