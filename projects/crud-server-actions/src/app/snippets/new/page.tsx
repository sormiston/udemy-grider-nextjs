"use client";
import { useActionState } from "react";
import * as actions from "@/actions";
import type { NewSnippetErrorType, NewSnippetType } from "@/validators";
import type { CreateFormState } from "@/actions";

const initialFormState: CreateFormState = {
  data: {
    title: "",
    code: "",
  } as NewSnippetType,
  errors: {} as NewSnippetErrorType,
};

export default function NewSnippetPage() {
  const [formState, formAction] = useActionState(
    actions.createSnippet,
    initialFormState
  );

  return (
    <>
      <h3 className="font-bold m-3">Create Snippet</h3>
      <form action={formAction} className="flex flex-col gap-3 m-3 sm:w-sm">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>

          <div className="flex-grow flex flex-col gap-0.5">
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.data.title}
              className="w-full p-2 border border-gray-300 focus:border-gray-500"
            />
            <span aria-live="polite" className="inline-block h-5 text-red-500 text-sm">
              {formState.errors?.fieldErrors?.title &&
                formState.errors.fieldErrors.title[0]}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <div className="flex-grow flex flex-col gap-0.5">
            <textarea
              id="code"
              name="code"
              defaultValue={formState.data.code}
              className="w-full p-2 border border-gray-300 focus:border-gray-500"
            ></textarea>
            <span aria-live="polite" className="inline-block h-5 text-red-500 text-sm">
              {formState.errors?.fieldErrors?.code &&
                formState.errors.fieldErrors.code[0]}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-fit p-2 border border-gray-300 active:border-gray-500"
        >
          Submit
        </button>
      </form>
    </>
  );
}
