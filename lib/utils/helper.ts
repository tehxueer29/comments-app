export const getNestedReplies = (n: number): {} => {
  if (n === 1) {
    return {
      replies: {
        take: 3,
        orderBy: {
          likes: "desc",
        },
        where: {
          OR: [
            { deletedAt: null },
            { AND: { deletedAt: { not: null }, replies: { some: {} } } },
          ],
        },
      },
      user: true,
    };
  }
  return {
    replies: {
      take: 3,
      orderBy: {
        likes: "desc",
      },
      include: getNestedReplies(n - 1),
      where: {
        OR: [
          { deletedAt: null },
          { AND: { deletedAt: { not: null }, replies: { some: {} } } },
        ],
      },
    },
    user: true,
  };
};
