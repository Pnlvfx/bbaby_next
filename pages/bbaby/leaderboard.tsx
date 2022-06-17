import axios from "axios"
import { NextPageContext } from "next"
import Layout from "../../components/Layout"

const Leaderboard = () => {
  return (
    <Layout>
        
    </Layout>
  )
}

export default Leaderboard

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