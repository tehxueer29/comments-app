import ProfilePicture from "../../UI/ProfilePicture";

interface CommentHeaderProps {
  url: string;
  username: string;
  date: string;
  isMessageOwner: boolean;
}

export default function CommentHeader({
  url,
  username,
  date,
  isMessageOwner,
}: CommentHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      {/* TODO: Fix avatar import dynamic */}
      {/* <ProfilePicture url={profilePicture} /> */}
      <ProfilePicture url={url} />
      <div className="flex items-center gap-2">
        <div className="font-medium">{username}</div>
        {isMessageOwner && (
          <p className="align-middle font-medium text-white rounded bg-primary-500 px-1 py-px text-xs">
            you
          </p>
        )}
      </div>
      <div className="opacity-80 text-sm">{date}</div>
    </div>
  );
}
