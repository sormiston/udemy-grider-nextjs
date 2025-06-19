"use server";

import type { Snippet } from "@/generated/prisma";
import * as validators from "@/validators";
import { redirect } from "next/navigation";
import { UpdateDTO } from "@/types";
import { z } from "zod/v4";
import { db } from "@/db";

type SnippetUpdateDTO = UpdateDTO<Snippet>;

export type CreateFormState = {
  data: validators.NewSnippetType;
  errors: validators.NewSnippetErrorType;
};

export async function createSnippet(
  _state: CreateFormState,
  formData: FormData
) {
  const data: validators.NewSnippetType = {
    title: formData.get("title")?.toString() || "",
    code: formData.get("code")?.toString() || "",
  };
  const check = validators.newSnippetValidator.safeParse(data);

  // if client state still dirty
  if (!check.success) {
    return {
      data,
      errors: z.flattenError(check.error),
    };
  }

  await db.snippet.create({
    data: check.data,
  });

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

  redirect("/snippets/list");
}
