// TODO: refactor this as a route handler for true RESTfulness
"use server";

import type { Snippet } from "@/generated/prisma";
import { UpdateDTO } from "@/types";
import { db } from "@/db";

type SnippetUpdateDTO = UpdateDTO<Snippet>;

export async function updateSnippet(data: SnippetUpdateDTO) {
  try {
    const updated = await db.snippet.update({
      where: {
        id: data.id,
      },
      data,
    });

    // These are not true HTTP response objects!
    // The HTTP request / response objects are not exposed to React Server Actions
    // React Server Actions can only respond with serializable values
    return { status: 200, message: "Snippet updated successfully", updated };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Failed to update snippet", error };
  }
}
