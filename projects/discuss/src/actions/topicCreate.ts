'use server';

import type { Topic } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

export type NewTopicPayload = Pick<Topic, 'slug' | 'description'>;

export function TopicCreate(payload: NewTopicPayload) {
  console.log('TopicCreate action triggered with payload:', payload);
  revalidatePath(paths.home());
}
