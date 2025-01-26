"use client";

import CommentLayout from "@/layouts/CommentLayout";
import ProfilePicture from "../UI/ProfilePicture";
import Avatar from "@/public/images/avatars/image-amyrobson.png";
import TextArea from "@/UI/TextArea";
import Button from "@/UI/Button";

interface PostCommentProps {
  isReply: boolean;
}

export default function PostComment({ isReply }: PostCommentProps) {
  return (
    <CommentLayout>
      <TextArea />
      <div className="flex items-center justify-between">
        {/* TODO: Fix avatar import dynamic */}
        {/* <ProfilePicture url={url} /> */}
        <ProfilePicture url={Avatar} />
        <Button onClick={() => {}}>{isReply ? "Reply" : "Send"}</Button>
      </div>
    </CommentLayout>
  );
}
