import { notFound } from "next/navigation";
import { db } from "@/db";
import * as actions from "@/actions";

import Link from "next/link";

type ViewSnippetPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ViewSnippetPage(props: ViewSnippetPageProps) {
  // TEMPORARY: artificial delay to simulate loading
  // await new Promise((resolve) => setTimeout(resolve, 2000));

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, parseInt(id));

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-3xl m-3">{snippet.title}</h3>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="pressable-white button"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="pressable-white button">Delete</button>
          </form>
        </div>
      </div>
      <pre className="bg-gray-200 overflow-scroll p-2 rounded-md m-3">
        {snippet.code}
      </pre>
    </>
  );
}
