import type { NextPage, NextPageContext } from 'next'
import { useContext, useEffect } from 'react'
import postapis from '../../../../components/API/postapis/postapis'
import { getSession } from '../../../../components/API/ssrAPI'
import CommentPage from '../../../../components/comments/CommentPage'
import { CommunityContext, CommunityContextProps } from '../../../../components/community/CommunityContext'
import CEO from '../../../../components/main/CEO'
import { siteUrl } from '../../../../components/main/config'
import PageNotFound from '../../../../components/main/PageNotFound'

interface PostIdPageProps {
  post: PostProps
}

const IdPage: NextPage<PostIdPageProps> = ({ post }) => {
  const { getCommunity } = useContext(CommunityContext) as CommunityContextProps

  useEffect(() => {
    if (!post) return
    getCommunity(post.community)
  }, [post])

  if (!post) {
    return <PageNotFound />
  }

  return (
    <>
      <CEO
        title={post?.title}
        url={`${siteUrl}/b/${post.community.toLowerCase()}/comments/${post._id}`}
        description={
          post?.body?.length >= 160
            ? post.body
            : `${post.body || ''} ${post.ups} votes, ${post.numComments} comments in the ${post.community} community. b/${post.community}`
        }
        twitter_card={'summary_large_image'}
        type={'article'}
        image={post.mediaInfo?.isImage ? post.mediaInfo.image : post.mediaInfo?.isVideo ? post.mediaInfo.video.url.replace('mp4', 'jpg') : ''}
        video={post.mediaInfo?.isVideo ? post.mediaInfo.video.url : undefined}
        width={post.mediaInfo?.dimension ? post.mediaInfo.dimension[1]?.toString() : undefined}
        height={post.mediaInfo?.dimension ? post.mediaInfo.dimension[0]?.toString() : undefined}
        index={true}
      />
      <CommentPage post={post} />
    </>
  )
}

export default IdPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const { id } = context.query
    if (!id) throw new Error('Missing post for this id!')
    const session = await getSession(context)
    const post = await postapis.getPost(id.toString(), context)
    return {
      props: {
        session,
        post,
      },
    }
  } catch (err) {
    const error = `Our server seems to be in trouble, please retry in a few seconds.`
    return {
      props: {
        error,
      },
    }
  }
}
