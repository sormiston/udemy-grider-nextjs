'use client';

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import type { TopicCreateActionState } from '@/actions/topicCreate';
import { useActionState, startTransition } from 'react';
import * as actions from '@/actions';

const initialState: TopicCreateActionState = {
  errors: {
    fieldErrors: {},
    formErrors: [],
    appStateErrors: [],
  },
};

export default function TopicCreateForm() {
  const [state, dispatch, isPending] = useActionState(
    actions.topicCreate,
    initialState
  );

  const computedFormErrors = state.errors.formErrors.concat(
    state.errors.appStateErrors
  );

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      dispatch(new FormData(event.currentTarget));
    });
  }

  function clearActionState() {
    startTransition(() => {
      const fd = new FormData();
      fd.set('reset', 'true');
      dispatch(fd);
    });
  }

  return (
    <Popover placement="left-start" onClose={clearActionState}>
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleOnSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              errorMessage={state.errors.fieldErrors?.name?.join(', ')}
              isInvalid={!!state.errors.fieldErrors?.name}
              placeholder="your-topic-name"
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              errorMessage={state.errors.fieldErrors?.description?.join(', ')}
              isInvalid={!!state.errors.fieldErrors?.description}
              placeholder="Describe your topic"
            />
            <Button type="submit">Submit</Button>
            {computedFormErrors.length > 0 && (
              <div className="text-red-500">
                <p>{computedFormErrors.join(', ')}</p>
              </div>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
