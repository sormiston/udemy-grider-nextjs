import SnippetEditForm from "@/components/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";
type SnippetEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  let snippet;
  try {
    snippet = await db.snippet.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching snippet:", error.message);
    } else {
      console.error("Error fetching snippet:", error);
    }
    notFound();
  }

  return (
    <>
      <h2>Editing snippet with title: {snippet.title}</h2>
      <SnippetEditForm snippet={snippet} />
    </>
  );
}
