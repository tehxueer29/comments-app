"use client";

import { useState } from "react";
import { CommentTypeWithReplies } from "@/types";

import BaseComment from "./BaseComment";

interface CommentProps {
  comments: CommentTypeWithReplies[];
}

type HideReplies = {
  [key: string]: boolean;
};

export default function Comment({ comments }: CommentProps) {
  
  const [hideReplies, setHideReplies] = useState<HideReplies>({});

  const handleToggleReplies = (
    commentId: string,
    e?: React.MouseEvent<HTMLDivElement>
  ) => {
    e && e.stopPropagation();
    setHideReplies((prevState) => {
      return { ...prevState, [commentId]: !prevState[commentId] };
    });
  };

  return (
    <div className="space-y-4 xl:space-y-5">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4 xl:space-y-5">
          <BaseComment
            {...comment}
            name={comment.user.name}
            imageUrl={comment.user.imageUrl}
            hideReplies={hideReplies[comment.id] || false}
            triggerShowReplies={handleToggleReplies}
          />
          {comment.replies.length > 0 && (
            <div className={`flex ${hideReplies[comment.id] ? "hidden" : ""}`}>
              <div
                className="cursor-pointer group"
                onClick={(e) => handleToggleReplies(comment.id, e)}
              >
                <div
                  className={`me-4 w-0.5 mb-4 bg-gray-800 opacity-10 group-hover:opacity-30 duration-150 h-full xl:mx-11`}
                />
              </div>
              <div className="w-full">
                <Comment comments={comment.replies} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
