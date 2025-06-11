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
          className="m-3 pressable-white button"
        >
          New
        </Link>
      </div>
      <ul className="flex flex-col gap-2 m-3">
        {snippets.map((snippet) => (
          <li key={snippet.id}>
            <Link
              href={`/snippets/${snippet.id}`}
              className="flex justify-between items-center p-2 border rounded group pressable-white"
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
