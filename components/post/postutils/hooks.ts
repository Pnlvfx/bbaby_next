import Router from "next/router";
import { MouseEvent } from "react";

export const openPost = (
    e: MouseEvent<HTMLDivElement | HTMLAnchorElement>, 
    mobile: boolean, 
    post: PostProps
    ) => {
    e.preventDefault();
    e.stopPropagation();
    const url = mobile
    ? `/b/${post.community}/comments/${post._id}`
    : Router.pathname
    const query = mobile
      ? undefined
      : { postId: post._id, community: post.community, username: post.author }
    const as = mobile ? undefined : `/b/${post.community}/comments/${post._id}`
    Router.push(
      {
        pathname: url,
        query,
      },
      as,
      { scroll: false }
    )
  }