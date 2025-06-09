import { db } from "@/db";

export default async function ListSnippetsPage() {
  // This function will fetch all snippets from the database
  // and display them in a list.
  const snippets = await db.snippet.findMany();

  return (
    <>
      <h3 className="font-bold m-3">Snippets</h3>
      <ul className="m-3">
        {snippets.map((snippet) => (
          <li key={snippet.id} className="mb-2">
            <h4 className="font-semibold">{snippet.title}</h4>
            <pre className="bg-gray-100 p-2 rounded">{snippet.code}</pre>
          </li>
        ))}
      </ul>
    </>
  );
}
