'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const createCommentSchema = z.object({
  content: z.string().min(2, 'Comment must be at least 2 characters'),
});

type CommentCreateFormData = z.infer<typeof createCommentSchema>;

type CommentCreateFieldErrors = Pick<
  ReturnType<typeof z.flattenError<CommentCreateFormData>>,
  'fieldErrors'
>;

type CommentCreateFormErrors = Pick<
  ReturnType<typeof z.flattenError<CommentCreateFormData>>,
  'formErrors'
>;

type CommentCreateErrors = CommentCreateFieldErrors &
  CommentCreateFormErrors & { appStateErrors: string[] };

export type CommentCreateActionState = {
  success: boolean;
  errors: CommentCreateErrors;
};

export async function commentCreate(
  _prevState: CommentCreateActionState,
  postId: string,
  formData: FormData,
  parentId?: string
): Promise<CommentCreateActionState> {
  const user = await auth();
  if (!user) {
    return {
      success: false,
      errors: {
        fieldErrors: {},
        formErrors: [] as string[],
        appStateErrors: ['You must be signed in to do this'],
      },
    };
  }

  const formEntries = {
    content: formData.get('content') as string,
  };
  const validated = createCommentSchema.safeParse(formEntries);
  if (!validated.success) {
    return {
      success: false,
      errors: {
        fieldErrors: z.flattenError(validated.error).fieldErrors,
        formErrors: z.flattenError(validated.error).formErrors.length
          ? ['Something went wrong, please try again.']
          : [],
        appStateErrors: [] as string[],
      },
    };
  }

  try {
    const userId = user.user?.id;
    if (!userId) {
      throw new Error('No user found on authenticated session');
    }
  
    await db.comment.create({
      data: {
        content: validated.data.content,
        postId: postId,
        parentId: parentId,
        userId: userId,
      },
    });

    // Find topic for revalidation
    const topic = await db.topic.findFirst({
      where: { posts: { some: { id: postId } } },
    });
    if (!topic) {
      throw new Error('Failed to revalidate topic');
    }
    revalidatePath(paths.postView(topic.slug, postId));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating post:', error.message);
    } else {
      console.error('Unknown error creating post:', error);
    }
    return {
      success: false,
      errors: {
        fieldErrors: {},
        formErrors: [] as string[],
        appStateErrors: ['Something went wrong, please try again.'],
      },
    };
  }

  return {
    success: true,
    errors: {
      fieldErrors: {},
      formErrors: [],
      appStateErrors: [],
    },
  };
}
