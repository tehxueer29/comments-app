interface TextAreaProps {
  message: string;
  setMessage: (message: string) => void; 
  className?: string;
}

export default function TextArea({ message, setMessage, className }: TextAreaProps) {
  return (
    <div className={`w-full relative ${className || ""}`}>
      <div className="px-4 py-2 overflow-y-hidden whitespace-pre-wrap  break-words max-h-40 min-h-20 invisible leading-[24px]">
        {message}
      </div>
      <div className="h-1"/>
      <textarea
        placeholder="Add a comment..."
        className="absolute right-0 top-0 bottom-0 left-0 px-4 py-2 caret-primary-500 resize-none leading-[24px] border rounded-md placeholder:text-black placeholder:opacity-60 focus:outline-primary-500 duration-150 focus:outline hover:border-primary-500"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
      />
    </div>
  );
}
