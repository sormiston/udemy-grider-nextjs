import { z } from "zod/v4";
import type { Snippet } from "@/generated/prisma";

// BASE SNIPPET FIELDS VALIDATION SCHEMA
const snippetFieldsValidation = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer!"),
  title: z.string().min(3, "Title too short!").max(175, "Title too long!"),
  code: z.string().min(10, "Code too short!"),
});

// RUN AN INTERNAL TS CHECK TO ENSURE THAT THE ZOD SCHEMA MATCHES THE PRISMA-GENERATED SNIPPET TYPE
type ZodPrismaSnippetParityCheck = z.infer<
  typeof snippetFieldsValidation
> extends Snippet
  ? // Fail Quickly! in case Zod Snippet Schema and Prisma-genereated Schema
    // diverge, SnippetSchemaType will be "never", and assignments to it will
    // fail as TSC errors
    typeof snippetFieldsValidation
  : never;

const _check: ZodPrismaSnippetParityCheck = snippetFieldsValidation;

// DEFINE CASE-SPECIFIC VALIDATION SCHEMAS

// CREATE SNIPPET VALIDATION SCHEMA
export const newSnippetValidator = snippetFieldsValidation.omit({ id: true });
export type NewSnippetType = z.infer<typeof newSnippetValidator>;
export type NewSnippetErrorType = ReturnType<
  typeof z.flattenError<NewSnippetType>
>;
