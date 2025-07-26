import type { Comment } from '@/generated/prisma';
import { db } from '@/db';

export type CommentWithAuthor = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export async function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  const query = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
  });

  return query;
}
