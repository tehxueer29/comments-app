"use client";

import { CommentType } from "@/types/types";
import { useState } from "react";

import BaseComment from "./BaseComment";

interface CommentProps {
  comments: CommentType[];
}

type HideReplies = {
  [key: number]: boolean;
};

export default function Comment({ comments }: CommentProps) {
  const [hideReplies, setHideReplies] = useState<HideReplies>({});

  const handleToggleReplies = (
    commentId: number,
    e?: React.MouseEvent<HTMLDivElement>
  ) => {
    e && e.stopPropagation();
    setHideReplies((prevState) => {
      return { ...prevState, [commentId]: !prevState[commentId] };
    });
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          <BaseComment
            {...comment}
            hideReplies={hideReplies[comment.id] || false}
            triggerShowReplies={handleToggleReplies}
          />
          {comment.replies && (
            <div className={`flex ${hideReplies[comment.id] ? "hidden" : ""}`}>
              <div
                className="cursor-pointer group"
                onClick={(e) => handleToggleReplies(comment.id, e)}
              >
                <div
                  className={`me-4 w-0.5 mb-4 bg-gray-800 opacity-10 group-hover:opacity-30 duration-150 h-full`}
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
