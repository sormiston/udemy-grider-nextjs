'use client';

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
} from '@nextui-org/react';
import type { PostCreateActionState } from '@/actions/post-create';
import {
  useActionState,
  startTransition,
  Fragment,
  useState,
  useEffect,
  useMemo,
} from 'react';
import * as actions from '@/actions';

const initialState: PostCreateActionState = {
  errors: {
    fieldErrors: {},
    formErrors: [],
    appStateErrors: [],
  },
};

export default function PostCreateForm({ topicSlug }: { topicSlug: string }) {
  /* STATE */
  /* Use action state to manage form submission and errors */
  const [actionState, dispatch, isPending] = useActionState(
    actions.postCreate.bind(null, topicSlug),
    initialState
  );

  /* 
  Local state for managing form error feedback
  This is local because we want to be able to reset it client-side
  without needing to awaiting a server action call.
  Otherwise, it should always be in sync with action state.
  */
  const [localState, setLocalState] = useState(initialState);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  /* EFFECTS */
  /* Sync local state with action state on mount and when action state changes */
  useEffect(() => {
    setLocalState(actionState);
  }, [actionState]);

  useEffect(() => {
    // Reset local state when the popover is closed
    if (!isPopoverOpen) {
      setLocalState(initialState);
    }
  }, [isPopoverOpen]);

  /* MEMOIZED VALUES */
  const computedFormErrors = useMemo<string[]>(() => {
    return localState.errors.formErrors.concat(
      localState.errors.appStateErrors
    );
  }, [localState.errors.formErrors, localState.errors.appStateErrors]);

  const fieldErrorMessages = useMemo(() => {
    return {
      title: localState.errors.fieldErrors?.title
        ? formatErrorMessage(localState.errors.fieldErrors.title)
        : undefined,
      content:
        localState.errors.fieldErrors?.content &&
        formatErrorMessage(localState.errors.fieldErrors.content),
    };
  }, [localState.errors.fieldErrors]);

  /* HANDLERS */
  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      const formData = new FormData(event.currentTarget);
      dispatch(formData);
    });
  }

  /* HELPERS */
  function formatErrorMessage(errors: string[]) {
    return errors.length > 0
      ? errors.map((err, index) => (
          <Fragment key={index}>
            {`\u2022 ${err}`}
            <br />
          </Fragment>
        ))
      : undefined;
  }

  return (
    <Popover
      placement="left-start"
      isOpen={isPopoverOpen}
      onOpenChange={open => setIsPopoverOpen(open)}
    >
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              disabled={isPending}
              errorMessage={fieldErrorMessages.title}
              isInvalid={!!fieldErrorMessages.title}
              placeholder="Title"
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              disabled={isPending}
              errorMessage={fieldErrorMessages.content}
              isInvalid={!!fieldErrorMessages.content}
              placeholder="Content"
            />
            <Button type="submit" isLoading={isPending}>
              {!isPending && 'Submit'}
            </Button>
            {computedFormErrors.length > 0 && (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                <p>{computedFormErrors.join(', ')}</p>
              </div>
            )}
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
