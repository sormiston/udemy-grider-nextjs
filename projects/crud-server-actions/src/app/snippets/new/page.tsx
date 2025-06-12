import { db } from "@/db";
import { redirect } from "next/navigation";

export default function NewSnippetPage() {
  async function handleCreateSnippet(formData: FormData) {
    // TODO: refactor this as a route handler for true RESTfulness
    "use server";
    // This function will handle the form submission
    // and create a new snippet in the database.
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // Here you would typically call a database function to save the snippet.

    // For example:
    await db.snippet.create({
      data: { title, code },
    });

    // Redirect or return a success message
    redirect("/");
  }

  return (
    <>
      <h3 className="font-bold m-3">Create Snippet</h3>
      <form
        action={handleCreateSnippet}
        className="flex flex-col gap-3 m-3 w-sm"
      >
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 focus:border-gray-500"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="w-full p-2 border border-gray-300 focus:border-gray-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-fit p-2 border border-gray-300 active:border-gray-500"
        >
          Submit
        </button>
      </form>
    </>
  );
}
