'use server';
import { auth } from '@/auth';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, 'Name is required and must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Name must be lowercase and can only contain letters, numbers, and hyphens'
    ),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must be less than 500 characters long'),
});

type TopicCreatePayload = z.infer<typeof createTopicSchema>;

type TopicCreateFieldErrors = Pick<
  ReturnType<typeof z.flattenError<TopicCreatePayload>>,
  'fieldErrors'
>;

type TopicCreateFormErrors = Pick<
  ReturnType<typeof z.flattenError<TopicCreatePayload>>,
  'formErrors'
>;

type TopicCreateErrors = TopicCreateFieldErrors &
  TopicCreateFormErrors & { appStateErrors: string[] };

export type TopicCreateActionState = {
  errors: TopicCreateErrors;
};

export async function topicCreate(
  _prevState: TopicCreateActionState,
  payload: FormData
) {
  // Simulate a delay for demo of pending state
  // await new Promise(resolve => setTimeout(resolve, 1000));

  const formData = {
    name: payload.get('name') as string,
    description: payload.get('description') as string,
  };
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

  const validated = createTopicSchema.safeParse(formData);

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

  let newTopicSlug;
  try {
    // TODO: add case handling for where topic already exists
    const newTopic = await db.topic.create({
      data: {
        slug: validated.data.name,
        description: validated.data.description,
      },
    });
    newTopicSlug = newTopic.slug;
    revalidatePath(paths.home());
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating topic:', error.message);
    } else {
      console.error('Unknown error creating topic:', error);
    }
    return {
      errors: {
        fieldErrors: {},
        formErrors: [] as string[],
        appStateErrors: ['Something went wrong, please try again.'],
      },
    };
  }

  redirect(paths.topicView(newTopicSlug));
}
