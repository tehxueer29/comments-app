import { Comment as CommentType, User as UserType } from "@prisma/client";

export interface CommentTypeWithReplies extends CommentType {
  user: UserType;
  replies: CommentTypeWithReplies[];
}
