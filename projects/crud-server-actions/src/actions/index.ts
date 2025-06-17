// TODO: OPTIONAL: refactor to route handler patern for true RESTfulness? 
"use server";

import type { Snippet } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { UpdateDTO } from "@/types";
import { db } from "@/db";

type SnippetUpdateDTO = UpdateDTO<Snippet>;

// TODO: consolidate server actions; add error handling
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
