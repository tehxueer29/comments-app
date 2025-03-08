import PlusIcon from "@/public/images/icon-plus.svg";
import MinusIcon from "@/public/images/icon-minus.svg";
import Image from "next/image";
import useComment from "@/components/useComment";
import { updateCommentLikes } from "@/lib/axiosFetcher";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => (
  <button
    className="py-3 px-3 md:py-3 md:px-0 opacity-30 hover:opacity-80 duration-150"
    onClick={onClick}
  >
    {children}
  </button>
);

interface LikeButtonProps {
  likes: number;
  commentID: string;
  postID: string;
}

export default function LikeButton({ likes, commentID , postID}: LikeButtonProps) {
  const {mutate} = useComment({postID});
  const likeUnlikeComment = async (isLike: boolean) => {

    updateCommentLikes(isLike ? likes + 1 : likes - 1, commentID)
    mutate()
    
  };
  return (
    <div className="flex items-center px-0 md:px-3 bg-gray-100 rounded-lg md:flex-col ">
      <Button onClick={() => likeUnlikeComment(true)}>
        <Image src={PlusIcon} alt="Plus icon" unoptimized />
      </Button>
      <p className="font-medium text-primary-500 text-sm">{likes}</p>
      <Button onClick={() => likeUnlikeComment(false)}>
        <Image src={MinusIcon} alt="Minus icon" unoptimized />
      </Button>
    </div>
  );
}
