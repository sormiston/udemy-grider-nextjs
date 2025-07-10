'use server';

import type { Comment } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

export type NewCommentPayload = Pick<
  Comment,
  'content' | 'postId' | 'parentId' | 'userId'
> & { topicSlug: string };

export async function CommentCreate(payload: NewCommentPayload) {
  const { topicSlug, postId } = payload;
  console.log('CommentCreate action triggered with payload:', payload);
  revalidatePath(paths.postView(topicSlug, postId));
}
