'use client';

import type { CommentCreateActionState } from '@/actions/comment-create';
import {
  useActionState,
  startTransition,
  Fragment,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Textarea, Button } from '@nextui-org/react';
import * as actions from '@/actions';

type CommentCreateFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(startOpen);
  const initialState: CommentCreateActionState = {
    success: false,
    errors: {
      fieldErrors: {},
      formErrors: [],
      appStateErrors: [],
    },
  };
  const [actionState, dispatch, isPending] = useActionState(
    (state: CommentCreateActionState, formData: FormData) =>
      actions.commentCreate(state, postId, formData, parentId),
    initialState
  );
  // Local state for managing form error feedback
  const [localState, setLocalState] =
    useState<typeof initialState>(initialState);

  useEffect(() => {
    setLocalState(actionState);
  }, [actionState]);

  useEffect(() => {
    // Reset local state when the form is closed
    if (!isPopoverOpen) {
      setLocalState(initialState);
    }
  }, [isPopoverOpen]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (localState.success) {
      timeoutId = setTimeout(() => {
        setIsPopoverOpen(false);
        setLocalState(initialState);
      }, 0);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [localState.success]);

  // Memoized error helpers
  const computedFormErrors = useMemo<string[]>(() => {
    return localState.errors.formErrors.concat(
      localState.errors.appStateErrors
    );
  }, [localState.errors.formErrors, localState.errors.appStateErrors]);

  const fieldErrorMessages = useMemo(() => {
    return {
      content: Array.isArray(localState.errors.fieldErrors?.content)
        ? formatErrorMessage(localState.errors.fieldErrors.content)
        : undefined,
    };
  }, [localState.errors.fieldErrors]);

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

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      const formData = new FormData(event.currentTarget);
      dispatch(formData);
    });
  }

  const form = (
    <form onSubmit={handleOnSubmit}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!fieldErrorMessages.content}
          errorMessage={fieldErrorMessages.content}
        />
        {computedFormErrors.length > 0 && (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            <p>{computedFormErrors.join(', ')}</p>
          </div>
        )}
        <Button type="submit" isLoading={isPending}>
          {!isPending && 'Create Comment'}
        </Button>
      </div>
    </form>
  );

  return (
    <div>
      <Button
        size="sm"
        variant="light"
        onPress={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        Reply
      </Button>
      {isPopoverOpen && form}
    </div>
  );
}
