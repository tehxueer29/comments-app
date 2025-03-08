"use client";

import ContainerLayout from "@/layouts/ContainerLayout";
import ProfilePicture from "../UI/ProfilePicture";
import Avatar from "@/public/images/avatars/default.svg";
import TextArea from "@/UI/TextArea";
import Button from "@/UI/Button";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { useState } from "react";
import useComment from "./useComment";
import { createComment as createCommentApi } from "@/lib/axiosFetcher";

interface PostCommentProps {
  isReply: boolean;
  postID: string;
  commentID?: string;
  closeReply?: () => void;
}

export default function PostComment({
  isReply,
  postID,
  commentID,
  closeReply,
}: PostCommentProps) {
  const { mutate } = useComment({ postID });

  const [message, setMessage] = useState("");

  const user = useAppSelector(selectUser);

  const createComment = () => {
    createCommentApi(
      message,
      user?.id || "",
      postID,
      isReply ? commentID : null
    );

    mutate();
    setMessage("");
    closeReply && closeReply()
  };

  return (
    <ContainerLayout className="flex flex-wrap items-center justify-between gap-4 lg:items-start">
      <ProfilePicture
        url={user?.imageUrl || Avatar}
        className="order-2 md:order-1"
      />

      <div className="order-1 w-full md:w-auto md:flex-1 md:order-2">
        <TextArea message={message} setMessage={setMessage} />
      </div>

      <Button className="order-3" onClick={createComment}>
        {isReply ? "Reply" : "Send"}
      </Button>
    </ContainerLayout>
  );
}
