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
import type { TopicCreateActionState } from '@/actions/topic-create';
import {
  useActionState,
  startTransition,
  Fragment,
  useState,
  useEffect,
  useMemo,
} from 'react';
import * as actions from '@/actions';

const initialState: TopicCreateActionState = {
  errors: {
    fieldErrors: {},
    formErrors: [],
    appStateErrors: [],
  },
};

export default function TopicCreateForm() {
  /* STATE */
  /* Use action state to manage form submission and errors */
  const [actionState, dispatch, isPending] = useActionState(
    actions.topicCreate,
    initialState
  );

  /* 
  Local state for managing form error feedback
  This is local because we want to be able to reset it client-side
  without needing to awaiting a server action call.
  Otherwise, it should always be in sync with action state.
  */
  const [localState, setLocalState] = useState(initialState);
  useEffect(() => {
    // Update local state when action state changes
    setLocalState(actionState);
  }, [actionState]);

  /* MEMOIZED VALUES */
  const computedFormErrors = useMemo<string[]>(() => {
    return localState.errors.formErrors.concat(
      localState.errors.appStateErrors
    );
  }, [localState.errors.formErrors, localState.errors.appStateErrors]);

  const fieldErrorMessages = useMemo(() => {
    return {
      name: localState.errors.fieldErrors?.name
        ? formatErrorMessage(localState.errors.fieldErrors.name)
        : undefined,
      description:
        localState.errors.fieldErrors?.description &&
        formatErrorMessage(localState.errors.fieldErrors.description),
    };
  }, [localState.errors.fieldErrors]);

  /* HANDLERS */
  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      dispatch(new FormData(event.currentTarget));
    });
  }

  function handlePopoverClose(isOpen: boolean) {
    if (!isOpen) {
      // Reset local state to clear errors and form data when the Popover is closed
      setLocalState(initialState);
    }
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
    <Popover placement="left-start" onOpenChange={handlePopoverClose}>
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              disabled={isPending}
              errorMessage={fieldErrorMessages.name}
              isInvalid={!!fieldErrorMessages.name}
              placeholder="your-topic-name"
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              disabled={isPending}
              errorMessage={fieldErrorMessages.description}
              isInvalid={!!fieldErrorMessages.description}
              placeholder="Describe your topic"
            />
            <Button type="submit" isLoading={isPending}>
              {!isPending && 'Submit'}
            </Button>
            {computedFormErrors.length > 0 && (
              <div className="text-red-500">
                <p>{computedFormErrors.join(', ')}</p>
              </div>
            )}
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
