import { useContext, useEffect } from 'react'
import BoardHeader from '../../components/community/BoardHeader'
import { CommunityContext, CommunityContextProps } from '../../components/community/CommunityContext'
import type { NextPage, NextPageContext } from 'next'
import Feed from '../../components/post/Feed'
import { getSession } from '../../components/API/ssrAPI'
import { siteUrl } from '../../components/main/config'
import CEO from '../../components/main/CEO'
import PageNotFound from '../../components/main/PageNotFound'
import postapis from '../../components/API/postapis/postapis'

type CommunityPg = {
  community: string
  posts?: PostProps[]
}

const CommunityPage: NextPage<CommunityPg> = ({ community, posts }) => {
  const description = `b/${community}`
  const url = community ? `${siteUrl}/b/${community.toLowerCase()}` : `${siteUrl}/b`
  const title = community || 'bbabystyle.com: page not found'
  const { getCommunity } = useContext(CommunityContext) as CommunityContextProps

  useEffect(() => {
    getCommunity(community)
  }, [])

  return (
    <>
      <CEO
        title={title}
        description={description}
        index={true}
        twitter_card={'summary'}
        type="website"
        url={url}
        image={posts && posts[0].communityIcon}
        height={'256'}
        width={'256'}
      />
      {community ? (
        <>
          <BoardHeader />
          <Feed community={community} posts={posts} />
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  )
}

export default CommunityPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const { community } = context.query
    if (!community) throw new Error('Missing the community!')
    const session = await getSession(context)
    const posts = await postapis.getPosts(0, {
      community: community.toString(),
      context,
      limit: 15,
    })
    return {
      props: {
        session,
        community,
        posts,
      },
    }
  } catch (err) {
    const error = `Sorry we couldn't load this page.`
    return {
      props: {
        error,
      },
    }
  }
}
