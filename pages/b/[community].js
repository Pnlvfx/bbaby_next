import {useContext, useEffect} from 'react'
import BoardHeader from '../../components/header/BoardHeader'
import {CommunityContext} from '../../components/community/CommunityContext'
import axios from 'axios';
import PostsListing from '../../components/post/PostsListing'
import Layout from '../../components/Layout'


function communityPage(props) {


  const {setCommunity} = useContext(CommunityContext)

  const {comments,community} = props

  useEffect(() => {
    setCommunity(community)
    
  },[community]);

  return (
    <Layout>
      <div className='w-full'>
        <BoardHeader community={community}/>
        <PostsListing comments={comments} community={community}/>
    </div>
    </Layout>
  )
}

export default communityPage

export async function getServerSideProps(context) {
  
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const {community} = query
  
  const res = await axios.get(`${server}/comments?community=${community}&limit=10&skip=0`);
  const comments = res.data

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data
  return {
    props: {
      session: session ,
      comments,
      community
    }
  }
}
