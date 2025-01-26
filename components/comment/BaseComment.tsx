"use client";
import ReplyIcon from "@/public/images/icon-reply.svg";
import EditIcon from "@/public/images/icon-edit.svg";
import ShowIcon from "@/public/images/icon-show.svg";
import CommentLayout from "@/layouts/CommentLayout";
import TextArea from "@/UI/TextArea";
import ImageButton from "@/UI/ImageButton";
import Button from "@/UI/Button";
import Avatar from "@/public/images/avatars/image-amyrobson.png";

import DeleteComment from "../DeleteComment";
import CommentHeader from "./CommentHeader";
import LikeButton from "./LikeButton";

import { useState } from "react";

interface CommentProps {
  id: number;
  username: string;
  profilePicture: string;
  date: string;
  message: string;
  likes: number;
  hideReplies: boolean;
  triggerShowReplies: (
    commentId: number,
    e?: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export default function BaseComment({
  id,
  username,
  profilePicture,
  date,
  message,
  likes,
  hideReplies,
  triggerShowReplies,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  // const isEditing = true;

  // TODO: get user from context
  const isMessageOwner = true;

  return (
    <CommentLayout className="w-full">
      <CommentHeader
        url={Avatar}
        username={username}
        date={date}
        isMessageOwner={isMessageOwner}
      />
      {/* TODO: move elements which use isEditing into its own component for SSR SEO */}
      {isEditing ? (
        <TextArea initialMessage={message} />
      ) : (
        <p className="mb-4 opacity-80">{message}</p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-y-4">
        {!isEditing && <LikeButton likes={likes} />}

        <div className="flex items-center gap-4 flex-wrap ">
          {hideReplies && (
            <ImageButton
              Icon={ShowIcon}
              text="View Replies"
              onClick={() => triggerShowReplies(id)}
            />
          )}

          {isMessageOwner ? (
            <>
              <DeleteComment />
              <ImageButton
                Icon={EditIcon}
                text={isEditing ? "Cancel" : "Edit"}
                onClick={() => setIsEditing((prev: boolean) => !prev)}
              />
            </>
          ) : (
            <ImageButton Icon={ReplyIcon} text="Reply" />
          )}
        </div>

        {isEditing && <Button onClick={() => {}}>Update</Button>}
      </div>
    </CommentLayout>
  );
}
