import Comment from "@/components/comment/Comment";
import PostComment from "@/components/PostComment";
import { CommentType } from "@/types/types";

export default function Home() {
  const comments: CommentType[] = [
    {
      id: 1,
      username: "amyrobson",
      profilePicture: "@/public/images/avatars/image-amyrobson.png",
      date: "1 month ago",
      message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
      likes: 12,
    },
    {
      id: 2,
      username: "test2 owner",
      profilePicture: "@/public/images/avatars/image-amyrobson.png",
      date: "1 month ago",
      message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
      likes: 12,
      replies: [
        {
          id: 3,
          username: "test3",
          profilePicture: "@/public/images/avatars/image-amyrobson.png",
          date: "1 month ago",
          message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
          likes: 12,
          replies: [
            {
              id: 5,
              username: "5",
              profilePicture: "@/public/images/avatars/image-amyrobson.png",
              date: "1 month ago",
              message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
              likes: 12,
            },
            {
              id: 6,
              username: "6",
              profilePicture: "@/public/images/avatars/image-amyrobson.png",
              date: "1 month ago",
              message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
              likes: 12,
            },
          ],
        },
        {
          id: 4,
          username: "4",
          profilePicture: "@/public/images/avatars/image-amyrobson.png",
          date: "1 month ago",
          message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
          likes: 12,
        },
      ],
    },
    {
      id: 7,
      username: "7",
      profilePicture: "@/public/images/avatars/image-amyrobson.png",
      date: "1 month ago",
      message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas iure doloribus eos nemo quia perferendis, animi quod, illo esse fugit! Ea veritatis minima quasi optio quam, enim aliquid repellat?`,
      likes: 12,
    },
  ];
  return (
    <div className="px-4 py-8 gap-y-4 flex flex-col">
      <Comment comments={comments} />
      <PostComment isReply={false} />
    </div>
  );
}
