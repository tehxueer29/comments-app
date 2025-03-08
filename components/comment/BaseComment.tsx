"use client";

import ContainerLayout from "@/layouts/ContainerLayout";
import TextArea from "@/UI/TextArea";
import Button from "@/UI/Button";
import CommentHeader from "./CommentHeader";
import CommentActions from "./commentActions/CommentActions";
import LikeButton from "./commentActions/LikeButton";
import PostComment from "../PostComment";

import { useEffect, useState } from "react";
import { Comment as CommentType } from "@prisma/client";
import { User as UserType } from "@prisma/client";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { updateComment as updateCommentApi } from "@/lib/axiosFetcher";
import useComment from "../useComment";

interface CommentProps {
  id: CommentType["id"];
  postID: CommentType["postID"];
  name: UserType["name"];
  imageUrl: UserType["imageUrl"];
  createdAt: CommentType["createdAt"];
  updatedAt: CommentType["updatedAt"];
  deletedAt: CommentType["deletedAt"] | null;
  body: CommentType["body"];
  likes: CommentType["likes"];
  hideReplies: boolean;
  triggerShowReplies: (
    commentId: string,
    e?: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export default function BaseComment({
  id,
  postID,
  name,
  imageUrl,
  createdAt,
  updatedAt,
  deletedAt,
  body,
  likes,
  hideReplies,
  triggerShowReplies,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [initMessage, setInitMessage] = useState(body);
  const [editMessage, setEditMessage] = useState(body);

  const [isMdBreakpoint, setIsMdBreakpoint] = useState(false);

  const user = useAppSelector(selectUser);
  const isMessageOwner = user?.name == name;

  const { mutate } = useComment({ postID });

  useEffect(() => {
    const handleResize = () => {
      setIsMdBreakpoint(window.innerWidth >= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resetEditedMessage = () => {
    setEditMessage(initMessage);
    setIsEditing((prev: boolean) => !prev);
  };

  const CommentActionsComponent = (
    <CommentActions
      id={id}
      postID={postID}
      isMessageOwner={isMessageOwner}
      hideReplies={hideReplies}
      triggerShowReplies={triggerShowReplies}
      isEditing={isEditing}
      setIsEditing={resetEditedMessage}
      triggerReply={() => {
        setIsReplying((prev: boolean) => !prev);
      }}
    />
  );

  const updateComment = async () => {
    updateCommentApi(editMessage, id);

    mutate();

    setIsEditing(false);
    setInitMessage(editMessage);
  };

  const UpdateButton = <Button onClick={updateComment}>Update</Button>;

  return (
    <div className="space-y-2">
      <ContainerLayout className="w-full md:flex md:flex-row-reverse md:gap-4">
        <div className="flex-1">
          <CommentHeader
            url={deletedAt ? null : imageUrl}
            username={deletedAt ? "[deleted]" : name}
            date={deletedAt ? null : updatedAt || createdAt}
            isMessageOwner={isMessageOwner}
          >
            {!deletedAt && isMdBreakpoint && CommentActionsComponent}
          </CommentHeader>
          {isEditing ? (
            <TextArea
              className="mb-4"
              message={editMessage}
              setMessage={setEditMessage}
            />
          ) : (
            <p className={`mb-4 opacity-80 ${deletedAt ? "line-through" : ""}`}>
              {initMessage}
            </p>
          )}
          {isMdBreakpoint && isEditing && (
            <div className="flex justify-end">{UpdateButton}</div>
          )}
        </div>

        {!deletedAt && (
          <div className="flex items-center justify-between flex-wrap gap-y-4 md:items-start">
            {!isEditing && (
              <LikeButton likes={likes} commentID={id} postID={postID} />
            )}

            {!isMdBreakpoint && CommentActionsComponent}

            {!isMdBreakpoint && isEditing && UpdateButton}
          </div>
        )}
      </ContainerLayout>
      {isReplying && (
        <PostComment
          isReply
          postID={postID}
          commentID={id}
          closeReply={() => setIsReplying(false)}
        />
      )}
    </div>
  );
}
