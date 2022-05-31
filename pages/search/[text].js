import { useRouter } from "next/router";
import {useEffect, useState} from 'react'
import Post from '../../components/post/Post' 
import axios from "axios";
import Layout from "../../components/Layout";


const SearchResultPage = () => {

  const router = useRouter();
  const {text} = router.query
  const [comments, setComments] = useState([]);
  const [communities,setCommunitis] = useState([]);
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  


  useEffect(() => {
    if (router.query) {
      axios.get(server+'/search?phrase='+text, {withCredentials:true})
      .then(response => {
        setComments(response.data.comments);
        setCommunitis(response.data.communities);
      })
    }
  },[router])


  return (
    <Layout>
      <div>
      {comments.map(comment => (
        <Post {...comment} />
      ))}
    </div>
    </Layout>
  )
}

export default SearchResultPage;

export async function getServerSideProps(context) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data
  return {
    props: {
      session: session,
    }
  }
}

