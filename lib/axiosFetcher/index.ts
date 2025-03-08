import { api } from "@/lib/axiosFetcher/axiosInstance";

interface PaginationParams {
  limit: number;
  page: number;
}

export const defaultParams: PaginationParams = {
  limit: 50,
  page: 1,
};

type commentFetcherParams = [string, string, PaginationParams];
type likeCommentFetcherParams = [string, number, string];

export const postUrl = "post";
export const getAllPosts = () => api.get(postUrl);

export const userUrl = "user";
export const getAllUsers = () => api.get(userUrl);

export const commentUrl = "comment";
export const getAllComments = ([_url, postID, params]: commentFetcherParams) =>
  api.get(commentUrl, {
    headers: {
      postID,
    },
    params,
  });

export const deleteComment = (commentID: string) =>
  api.delete(commentUrl, {
    headers: {
      commentID,
    },
  });

export const createComment = (
  body: string,
  userID: string,
  postID: string,
  parentID: string | null | undefined
) =>
  api.post(commentUrl, {
    body,
    userID,
    postID,
    parentID,
  });

export const updateComment = (body: string, commentID: string) =>
  api.put(
    commentUrl,
    {
      body,
    },
    {
      headers: { commentID },
    }
  );

export const updateCommentLikes = (likes: number, commentID: string) =>
  api.put(
    commentUrl,
    {
      likes,
    },
    {
      headers: { commentID },
    }
  );
