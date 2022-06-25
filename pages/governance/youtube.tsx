import Youtube from '../../components/governance/youtube/Youtube'
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Layout from "../../components/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";

const Governance: NextPage = () => {
  return (
    <div className="w-full h-[1000px]">
      <Layout>
        <GovernanceCtrl>
          <Youtube />
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default Governance;

export async function getServerSideProps(context: NextPageContext) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response =  await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    })
    const session = await response.data

  return {
    props: {
      session: session,
    }
  }
}