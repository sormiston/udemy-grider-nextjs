import { notFound } from "next/navigation";
import { db } from "@/db";

type ViewSnippetPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ViewSnippetPage(props: ViewSnippetPageProps) {
  const { id } = await props.params;

  const snippet = await db.snippet.findUnique({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <>
      <h3 className="font-bold m-3">{snippet.title}</h3>
      <pre className="bg-gray-100 p-2 rounded m-3">{snippet.code}</pre>
    </>
  );
}
