import ReplyIcon from "@/public/images/icon-reply.svg";
import EditIcon from "@/public/images/icon-edit.svg";
import ShowIcon from "@/public/images/icon-show.svg";
// import ImageButton from "@/UI/ImageButton";
import DeleteComment from "../../DeleteComment";
import dynamic from "next/dynamic";
const ImageButton = dynamic(() => import('@/UI/ImageButton'), { ssr: false })

interface CommentActionsProps {
  id: string;
  postID: string;
  isEditing: boolean;
  setIsEditing: () => void;
  hideReplies: boolean;
  triggerShowReplies: (
    commentId: string,
    e?: React.MouseEvent<HTMLDivElement>
  ) => void;
  isMessageOwner: boolean;
  className?: string;
  triggerReply: () => void;
}

export default function CommentActions({
  id,
  postID,
  isMessageOwner,
  hideReplies,
  triggerShowReplies,
  isEditing,
  setIsEditing,
  triggerReply,
  className,
}: CommentActionsProps) {
  return (
    <div className={`flex items-center gap-4 flex-wrap ${className || ""}`}>
      {hideReplies && (
        <ImageButton
          Icon={ShowIcon}
          text="View Replies"
          onClick={() => triggerShowReplies(id)}
        />
      )}

      {isMessageOwner ? (
        <>
          <DeleteComment commentID={id} postID={postID} />
          <ImageButton
            Icon={EditIcon}
            text={isEditing ? "Cancel" : "Edit"}
            onClick={setIsEditing}
          />
        </>
      ) : (
        <ImageButton Icon={ReplyIcon} text="Reply" onClick={triggerReply}/>
      )}
    </div>
  );
}
