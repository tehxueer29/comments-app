"use client";

import { useState } from "react";

interface TextAreaProps {
  initialMessage?: string;
}

export default function TextArea({ initialMessage }: TextAreaProps) {
  const [message, setMessage] = useState(initialMessage);

  return (
    <div className="w-full relative mb-4">
      <div className="px-4 py-2 overflow-y-hidden whitespace-pre-wrap  break-words max-h-[164px] min-h-[44px] invisible leading-[24px]">
        {message}
      </div>
      <div className="h-1"/>
      <textarea
        placeholder="Add a comment..."
        className="absolute right-0 top-0 bottom-0 left-0 px-4 py-2 resize-none  leading-[24px] border rounded-md placeholder:text-black placeholder:opacity-60 focus:outline-primary-500 focus:outline"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
      />
    </div>
  );
}
