import { db } from "@/db";
import Link from "next/link";

export default async function ListSnippetsPage() {
  // This function will fetch all snippets from the database
  // and display them in a list.
  const snippets = await db.snippet.findMany();

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold m-3">Snippets</h3>
        <Link
          href="/snippets/new"
          className="flex min-w-16 justify-center border rounded m-3 px-3 py-1 hover:shadow-lg hover:font-semibold focus-visible:shadow-lg focus-visible:font-semibold transition"
        >
          New
        </Link>
      </div>
      <ul className="flex flex-col gap-2 m-3">
        {snippets.map((snippet) => (
          <li key={snippet.id}>
            <Link
              href={`/snippets/${snippet.id}`}
              className="flex justify-between items-center p-2 border rounded group hover:shadow-lg focus-visible:shadow-lg transition"
            >
              <h4 className="font-semibold">{snippet.title}</h4>
              <span className="group-hover:font-semibold transition-all">
                View
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
