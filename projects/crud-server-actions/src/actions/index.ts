"use server";

import type { Snippet } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { UpdateDTO } from "@/types";
import { db } from "@/db";

type SnippetUpdateDTO = UpdateDTO<Snippet>;

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
