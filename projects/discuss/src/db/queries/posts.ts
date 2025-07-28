import type { Post } from '@/generated/prisma';
import { db } from '@/db';

export type PostListItem = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export async function fetchPostsByTopicSlug(
  slug: string
): Promise<PostListItem[]> {
  const query = await db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return query;
}

export type FetchPostByIdResult = ReturnType<typeof fetchPostById>;

export async function fetchPostById(postId: string) {
  const query = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      title: true,
      content: true,
    },
  });

  return query;
}

export async function fetchTopPosts(limit: number): Promise<PostListItem[]> {
  const query = await db.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    take: limit,
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return query;
}

export async function searchPosts(term: string): Promise<PostListItem[]> {
  const query = await db.post.findMany({
    where: {
      OR: [
        {
          title: { contains: term },
        },
        {
          content: { contains: term },
        },
      ],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return query;
}
