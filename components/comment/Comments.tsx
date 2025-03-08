"use client";
import dynamic from "next/dynamic";
const Comment = dynamic(() => import("@/components/comment/Comment"), {
  ssr: false,
});
import { CommentTypeWithReplies } from "@/types";
import useComment from "../useComment";

interface CommentsProps {
  postID: string;
}

export default function Comments({ postID }: CommentsProps) {
  const { comments, isLoading, isError } = useComment({ postID });

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const commentsData = comments?.data.data as CommentTypeWithReplies[];

  return <Comment comments={commentsData} />;
}
