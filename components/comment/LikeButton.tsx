import PlusIcon from "@/public/images/icon-plus.svg";
import MinusIcon from "@/public/images/icon-minus.svg";
import Image from "next/image";

interface LikeButtonProps {
  likes: number;
}

export default function LikeButton({ likes }: LikeButtonProps) {
  return (
    <div className="flex items-center py-1.5 px-3 bg-gray-100 gap-4 rounded-lg w-fit">
      <button>
        <Image src={PlusIcon} alt="Plus icon" />
      </button>
      <p className="font-medium text-primary-500 text-sm">{likes}</p>
      <button>
        <Image src={MinusIcon} alt="Minus icon" />
      </button>
    </div>
  );
}
