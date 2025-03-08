import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  const deleteComments = prisma.comment.deleteMany();
  const deletePosts = prisma.post.deleteMany();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteComments, deletePosts, deleteUsers]);

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      imageUrl: "https://fastly.picsum.photos/id/182/200/200.jpg?hmac=MkR-XEPoojVUql6ALw3mXJhEU63027NZxRXsRqavT24",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      imageUrl: "https://fastly.picsum.photos/id/192/200/200.jpg?hmac=ADFozPC7IeAOBiVxD2ZbHYkpCVEa8Xj_tZE_Dm7yFuo",
    },
  });

  const post1 = await prisma.post.create({
    data: {
      title: "First Post",
      body: "This is my first post!",
      userID: user1.id, // Link to User
    },
  });

  // Create comments for a single post
  await prisma.comment.create({
    data: {
      body: "Top-level comment",
      likes: 5,
      userID: user1.id,
      postID: post1.id,
      replies: {
        create: [
          {
            body: "Reply to top-level comment",
            likes: 1,
            userID: user2.id,
            postID: post1.id,
            replies: {
              create: [
                {
                  body: "Reply to reply",
                  likes: 2,
                  userID: user1.id,
                  postID: post1.id,
                },
                {
                  body: "Reply to reply 2",
                  likes: 3,
                  userID: user1.id,
                  postID: post1.id,
                },
              ],
            },
          },
          {
            body: "Reply to top-level comment 2",
            likes: 10,
            userID: user2.id,
            postID: post1.id,
          },
          {
            body: "Reply to top-level comment 3",
            likes: 9,
            userID: user2.id,
            postID: post1.id,
          },
        ],
      },
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        body: "Top-level comment 2",
        likes: 2,
        userID: user2.id,
        postID: post1.id,
      },
      {
        body: "Top-level comment 3",
        likes: 0,
        userID: user1.id,
        postID: post1.id,
      },
    ],
  });
}

main();
