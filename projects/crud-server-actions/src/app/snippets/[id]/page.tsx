import { notFound } from "next/navigation";
import { db } from "@/db";

type ViewSnippetPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ViewSnippetPage(props: ViewSnippetPageProps) {
  // TEMPORARY: artificial delay to simulate loading
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { id } = await props.params;
  let snippet;

  try {
    snippet = await db.snippet.findUnique({
      where: { id: parseInt(id) },
    });

    if (!snippet) {
      notFound();
    }
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
      <h3 className="font-bold m-3">{snippet.title}</h3>
      <pre className="bg-gray-100 p-2 rounded m-3">{snippet.code}</pre>
    </>
  );
}
