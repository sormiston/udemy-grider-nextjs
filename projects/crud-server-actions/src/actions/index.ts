"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

import { db } from "@/db";
import type { Snippet } from "@/generated/prisma";
import * as validators from "@/validators";
import { UpdateDTO } from "@/types";

type SnippetUpdateDTO = UpdateDTO<Snippet>;

export type CreateFormState = {
  data: validators.NewSnippetType;
  validationErrors: validators.NewSnippetErrorType;
  serverError: { message: string };
};

export async function createSnippet(
  _state: CreateFormState,
  formData: FormData
) {
  // UNCOMMENT TO TEST: sleep to test form pending state
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: validators.NewSnippetType = {
    title: formData.get("title")?.toString() || "",
    code: formData.get("code")?.toString() || "",
  };
  const check = validators.newSnippetValidator.safeParse(data);

  // if client state still dirty
  if (!check.success) {
    return {
      data,
      validationErrors: z.flattenError(check.error),
      serverError: { message: "" },
      errorType: "validation" as const,
    };
  }

  try {
    // UNCOMMENT TO TEST: server error at DB level
    // throw new Error("Simulated server error");
    await db.snippet.create({
      data: check.data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        data,
        validationErrors: {} as validators.NewSnippetErrorType,
        serverError: { message: error.message },
        errorType: "server" as const,
      };
    }
  }

  revalidatePath("/snippets/list");
  redirect("/snippets/list");
}

export async function updateSnippet(data: SnippetUpdateDTO) {
  await db.snippet.update({
    where: {
      id: data.id,
    },
    data,
  });

  redirect(`/snippets/${data.id}`);
}

export async function deleteSnippet(id: Snippet["id"]) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath("/snippets/list");
  redirect("/snippets/list");
}
