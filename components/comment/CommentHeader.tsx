"use client";

import ProfilePicture from "../../UI/ProfilePicture";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect } from "react";

interface CommentHeaderProps {
  url: string | null;
  username: string;
  date: Date | null;
  isMessageOwner: boolean;
  children: React.ReactNode;
}

export default function CommentHeader({
  url,
  username,
  date,
  isMessageOwner,
  children,
}: CommentHeaderProps) {
  dayjs.extend(relativeTime);

  const formattedDate = date ? dayjs(date).fromNow() : null;

  const [isMessageOwnerLoad, setIsMessageOwnerLoad] = useState(false);
  useEffect(() => {
    setIsMessageOwnerLoad(isMessageOwner);
  }, []);
  return (
    <div className="flex justify-between items-center mb-4 ">
      <div className="flex items-center gap-3 flex-wrap">
        <ProfilePicture url={url} />
        <div className="flex items-center gap-2">
          <div className="font-medium">{username}</div>
          {isMessageOwnerLoad && (
            <p className="align-middle font-medium text-white rounded bg-primary-500 px-1 py-px text-xs">
              you
            </p>
          )}
        </div>
        <div className="opacity-80 text-sm">{formattedDate}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
