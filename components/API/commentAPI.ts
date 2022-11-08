import { postRequestHeaders } from "../main/config";
import { catchError } from "./common";

export const postComment = async (commentBody: string, parentId: string, rootId: string) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const url = `${server}/comments`;
      const body = JSON.stringify({ body: commentBody, parentId, rootId })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        credentials: 'include',
        body,
      })
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        catchError(data?.msg)
      }
    } catch (err) {
      catchError(err)
    }
}

export const getCommentsFromPost = async (postId: string) => {
  try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const url = `${server}/comments/root/${postId}`;
      const response = await fetch(url, {
          method: 'GET',
      })
      const data = await response.json();
      if (response.ok) {
          return data
      } else {
        catchError(data?.msg)
      }
  } catch (err) {
     catchError(err);
  }
}