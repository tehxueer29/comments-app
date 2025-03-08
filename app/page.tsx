import Comments from "@/components/comment/Comments";
import PostComment from "@/components/PostComment";
import { getAllPosts } from "@/lib/axiosFetcher";

export default async function Home() {
  const postsReq = await getAllPosts();
  const posts = postsReq.data.data;

  return (
    <div className="px-4 py-8 gap-y-4 flex flex-col lg:py-16 lg:px-48 xl:px-80">
      <Comments  postID={posts[0].id}/>
      <PostComment isReply={false} postID={posts[0].id} />
    </div>
  );
}
