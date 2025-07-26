import type { Comment } from '@/generated/prisma';
import { db } from '@/db';
import { cache } from 'react';

export type CommentWithAuthor = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const fetchCommentsByPostId = cache(
  async (postId: string): Promise<CommentWithAuthor[]> => {
    console.log('querying fetchCommentsByPostId');
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
);
