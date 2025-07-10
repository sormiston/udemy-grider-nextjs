'use server';

import type { Post } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

export type NewPostPayload = Pick<
  Post,
  'title' | 'content' | 'userId' | 'topicId'
> & {
  topicSlug: string;
};

export function PostCreate(payload: NewPostPayload) {
  const { topicSlug } = payload;
  console.log('PostCreate action triggered with payload:', payload);

  revalidatePath(paths.topicView(topicSlug));
}
