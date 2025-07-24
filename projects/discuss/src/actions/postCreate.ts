'use server';
import { auth } from '@/auth';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title is required and must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .min(1, 'Content may not be empty')
    .max(2000, 'Content must be less than 2000 characters long'),
});

type PostCreateFormData = z.infer<typeof createPostSchema>;

type PostCreateFieldErrors = Pick<
  ReturnType<typeof z.flattenError<PostCreateFormData>>,
  'fieldErrors'
>;

type PostCreateFormErrors = Pick<
  ReturnType<typeof z.flattenError<PostCreateFormData>>,
  'formErrors'
>;

type PostCreateErrors = PostCreateFieldErrors &
  PostCreateFormErrors & { appStateErrors: string[] };

export type PostCreateActionState = {
  errors: PostCreateErrors;
};

export async function postCreate(
  topicSlug: string,
  _prevState: PostCreateActionState,
  formData: FormData
): Promise<PostCreateActionState> {
  // Simulate a delay for demo of pending state
  // await new Promise(resolve => setTimeout(resolve, 1000));

  const formEntries = Object.fromEntries(
    formData.entries()
  ) as PostCreateFormData;
  const user = await auth();

  if (!user) {
    return {
      errors: {
        fieldErrors: {},
        formErrors: [] as string[],
        appStateErrors: ['You must be signed in to do this'],
      },
    };
  }

  const validated = createPostSchema.safeParse(formEntries);

  if (!validated.success) {
    return {
      errors: {
        fieldErrors: z.flattenError(validated.error).fieldErrors,
        formErrors: z.flattenError(validated.error).formErrors.length
          ? ['Something went wrong, please try again.']
          : [],
        appStateErrors: [] as string[],
      },
    };
  }

  let newPost;
  try {
    // Look up topic by slug
    const topic = await db.topic.findUnique({
      where: { slug: topicSlug },
    });
    if (!topic) {
      throw new Error(`Topic ${topicSlug} not found in database`);
    }
    const userId = user.user?.id;
    if (!userId) {
      throw new Error('No user found on authenticated session');
    }
    newPost = await db.post.create({
      data: {
        title: validated.data.title,
        content: validated.data.content,
        userId,
        topicId: topic.id,
      },
    });
    revalidatePath(paths.topicView(topicSlug));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating post:', error.message);
    } else {
      console.error('Unknown error creating post:', error);
    }
    return {
      errors: {
        fieldErrors: {},
        formErrors: [] as string[],
        appStateErrors: ['Something went wrong, please try again.'],
      },
    };
  }

  redirect(paths.postView(topicSlug, newPost.id));
}
