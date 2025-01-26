
export type CommentType = {
    id: number;
    username: string;
    profilePicture: string;
    date: string;
    message: string;
    likes: number;
    replies?: CommentType[];
  };
  