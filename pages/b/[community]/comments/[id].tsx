import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head';
import CommentPage from '../../../../components/comments/CommentPage'
import Layout from '../../../../components/Layout';

const id: NextPage = (props) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const all: any = props
    const comment = all.comment
    

  return (
    <div>
       <Head>
        <title>{comment.title}</title>
        <meta property="og:title" content={comment.title} key='ogtitle' />
        <meta name="description" content={comment.body}  />
        <meta property="og:description" content={comment.body} key='ogdesc'/>
        <meta property="og:image" content={comment.image} key='ogimage' />
        <meta property="og:url" content={hostname + '/b/' + comment.community + '/comments/' + comment._id} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary_large_image" key='twcard'/>
        <meta name="twitter:image:alt" content="" />
        <link rel='canonical' href={hostname + '/b/' + comment.community + '/comments/' + comment._id} key='canonical' />
      </Head>
      <Layout>
        <CommentPage comment={comment} />
      </Layout>
    </div>
  )
}

export default id

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const {id} = query
  const res = await axios.get(server+`/comments/${id}`);

  const {data} = await res

  //login
  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data

  return {
    props: {
      session: session,
      comment: data
    }
  }
}







