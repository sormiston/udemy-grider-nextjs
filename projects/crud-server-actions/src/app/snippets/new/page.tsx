export default function NewSnippetPage() {
  return (
    <>
      <h3 className="font-bold m-3">Create Snippet</h3>
      <form className="flex flex-col gap-3 m-3 w-sm">
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
